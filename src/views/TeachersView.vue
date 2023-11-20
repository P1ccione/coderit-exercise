<template>
  <Alert v-show="showAlert" :alertText="alertText"/>
  <TeachersContainer @toggle-create-teacher="toggleCreateTeacher" @delete-teacher="deleteTeacher" :teachers="teachers" @toggle-edit-teacher="toggleEditTeacherForm1" />
  <div class="form-container" v-show="showCreateTeacher">
    <AddTeacherForm @create-teacher="createTeacher" @toggle-create-teacher="toggleCreateTeacher"/>
  </div>
  <div class="form-container" v-show="showEditTeacherForm">
    <EditTeacherForm @edit-teacher="EditTeacherForm" @toggle-edit-teacher="toggleEditTeacherForm" :editingTeacher="this.editingTeacher" />
  </div>
</template>

<script>

  import AddTeacherForm from "../components/AddTeacherForm"
  import TeachersContainer from "../components/TeachersContainer"
  import EditTeacherForm from "../components/EditTeacherForm"
  import Alert from "../components/Alert"

  export default {
      name: "TeachersView",

      components: {
        AddTeacherForm,
        TeachersContainer,
        EditTeacherForm,
        Alert,
      },
      data() {
        return {
          teachers: [],
          assignments: [],
          showCreateTeacher: false,
          showEditTeacherForm: false,
          showTeachersContainer: true,
          editingTeacher: null,
          showAlert: false,
          alertText: "ALERT"
        }
      },
      async created() {
        this.teachers = await this.fetchTeachers();
        this.assignments = await this.fetchaAssignments();
      },

      methods: {
      // fetch dei dati nel file db.json dell'array teachers
      async fetchTeachers() {
          const res = await fetch("http://localhost:5000/teachers")

          const data = await res.json()

          return data;
      },
      
      // funzione di fetch per prendere i teachers dal db
      async fetchTeacher(id) {
          const res = await fetch(`http://localhost:5000/teachers/${id}`)

          const data = await res.json()

          return data
      },

      // funzione di fetch per prendere gli assignments dal db
      async fetchaAssignments() {
          const res = await fetch('http://localhost:5000/assignments')

          const data = await res.json()

          return data
      },

      // funzione di fetch del db per controllare la presenza di collegamenti tra insegnante e corsi
      async fetchaAssignmentsTeacher(teacherId) {
          const res = await fetch(`http://localhost:5000/assignments?teacherid=${teacherId}`)

          const data = await res.json()

          return data.length > 0;
      },
      async deleteTeacher(id) {
          // controllo che l'insegnante non abbia collegamenti ai corsi
          const hasAssignments = await this.fetchaAssignmentsTeacher(id);

          if (hasAssignments) {
            // se vero blocco il delete dell'insegnante
            this.showAlertWithTimeout("Cannot delete teacher. There are assignments associated with this teacher.", 7000)
          } else if(confirm('Are you sure?')) {
            // altrimenti continua con il delete
            const res = await fetch(`http://localhost:5000/teachers/${id}`, {
              method: "DELETE",
            })  

            
            if (res.status === 200) {
                this.teachers = this.teachers.filter((teacher) => teacher.id !== id);
            } else {
              this.showAlertWithTimeout("Error deleting teacher", 7000)
            }

          }
        },

        async isEmailExists(email) {
            // Effettua una chiamata API per verificare se esiste già un insegnante con la stessa email
            const res = await fetch(`http://localhost:5000/teachers?email=${email}`);
            const data = await res.json();

            return data.length > 0; // Restituisce true se esiste già un insegnante con la stessa email, altrimenti false
        },

        async isPhoneExists(phonenumber) {
            // Effettua una chiamata API per verificare se esiste già un insegnante con lo stesso numero di telefono
            const res = await fetch(`http://localhost:5000/teachers?phonenumber=${phonenumber}`);
            const data = await res.json();

            return data.length > 0; // Restituisce true se esiste già un insegnante con lo stesso numero di telefono, altrimenti false
        },

        showAlertWithTimeout(text, timeout) {
          this.showAlert = true;
          this.alertText = text;

          // Memorizza il riferimento all'istanza Vue corrente
          const self = this;

          setTimeout(function() {
            // Ora, usa self invece di this
            self.showAlert = false;
            // console.log("time passed");
          }, timeout);
        },

        async EditTeacherForm(id, newTeacher) {
          const teacherToEdit = await this.fetchTeacher(id);

          // Verifica se esiste già un insegnante con la stessa email
          if (newTeacher.email !== teacherToEdit.email) {
            const isEmailExisting = await this.isEmailExists(newTeacher.email);
            if (isEmailExisting && newTeacher.email !== teacherToEdit.email) {
              this.showAlertWithTimeout("Esiste già un insegnante con la stessa email.", 7000)
              return;
            }
          }

          // Verifica se esiste già un insegnante con lo stesso numero di telefono
          if (newTeacher.phonenumber !== teacherToEdit.phonenumber) {
            const isPhoneExisting = await this.isPhoneExists(newTeacher.phonenumber);
            if (isPhoneExisting && newTeacher.phonenumber !== teacherToEdit.phonenumber) {
              // alert('Esiste già un insegnante con lo stesso numero di telefono.');
              this.showAlertWithTimeout('Esiste già un insegnante con lo stesso numero di telefono.', 7000)
              return;
            }
          }

          const upTeacher = {
            id: teacherToEdit.id,
            ...newTeacher,
          };

          const res = await fetch(`http://localhost:5000/teachers/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(upTeacher),
          });

          const data = await res.json();

          // Aggiorna la lista degli insegnanti con il nuovo dato ricevuto dal server
          this.teachers = this.teachers.map((teacher) =>
          teacher.id === id ? { ...teacher, ...data } : teacher
          );

          this.showEditTeacherForm = !this.showEditTeacherForm;
        },

        async createTeacher(teacher) {
            // Verifica se esiste già un insegnante con la stessa email
            const isEmailExisting = await this.isEmailExists(teacher.email);
            if (isEmailExisting) {
              this.showAlertWithTimeout('Esiste già un insegnante con la stessa email.', 7000)
              return;
            }

            // Verifica se esiste già un insegnante con lo stesso numero di telefono
            const isPhoneExisting = await this.isPhoneExists(teacher.phonenumber);
            if (isPhoneExisting) {
              this.showAlertWithTimeout('Esiste già un insegnante con lo stesso numero di telefono.', 7000)
              return;
            }

            const res = await fetch("http://localhost:5000/teachers", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(teacher),
            });

            const data = await res.json();

            this.teachers = [...this.teachers, data];
            this.showCreateTeacher = !this.showCreateTeacher;
        },
        
        // toggle del form create teacher
        toggleCreateTeacher() {
            this.showCreateTeacher = !this.showCreateTeacher
        },

        // toggle del form edit teacher
        toggleEditTeacherForm1(teacher) {
            this.editingTeacher = teacher;
            console.log(teacher);
            console.log(this.editingTeacher);
            this.showEditTeacherForm = !this.showEditTeacherForm
        },

        toggleEditTeacherForm() {
            this.showEditTeacherForm = !this.showEditTeacherForm
        },

        }
    }
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
    
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    /* outline: 1px orange solid */
  }

  body {
    font-family: 'Poppins', sans-serif;
  }

  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .content-container {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-container {
    position: absolute;
    width: 100%;
    height: 100vh;
    top:0;
    display: flex;
    flex-direction: column;
    row-gap: 50px;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.3);
    backdrop-filter: blur(2px);
  }

</style>
