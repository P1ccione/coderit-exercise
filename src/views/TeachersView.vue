<script>
    import TeachersTable from '../components/TeachersTable.vue';
    import AddTeacherForm from '../components/AddTeacherForm.vue';
    import EditTeacherForm from '../components/EditTeacherForm.vue';
    import { useStore } from 'vuex';
    export default {
        name: "TeachersView",
        components: {
            TeachersTable,
            AddTeacherForm,
            EditTeacherForm
        },
        data() {
            return {
                teachers: [],
                store: useStore()
            }
        },
        async created() {
            this.teachers = await this.fetchTeachers();
        },
        methods: {
            // fetch dei dati nel file db.json dell'array teachers
            async fetchTeachers() {
                const res = await fetch("http://localhost:5000/teachers");
                const data = await res.json();

                // Inverti l'array utilizzando il metodo reverse
                const reversedData = data.reverse();

                return reversedData;
            },
            // funzione di fetch per prendere i teachers dal db
            async fetchTeacher(id) {
                const res = await fetch(`http://localhost:5000/teachers/${id}`)

                const data = await res.json()

                return data
            },
            async fetchaAssignmentsTeacher(teacherId) {
                const res = await fetch(`http://localhost:5000/assignments?idteacher=${teacherId}`)

                const data = await res.json()

                return data.length > 0;
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
            async createTeacher(teacher) {

                const isEmailExisting = await this.isEmailExists(teacher.email);
                if (isEmailExisting) {
                    this.store.dispatch('showAlert' , ["ERROR", "There is already a teacher with the same email", 5000])
                    return;
                }

                // Verifica se esiste già un insegnante con lo stesso numero di telefono
                const isPhoneExisting = await this.isPhoneExists(teacher.phonenumber);
                if (isPhoneExisting) {
                    this.store.dispatch('showAlert' , ["ERROR", "There is already a teacher with the same phone number", 5000])
                    return;
                }

                const res = await fetch("http://localhost:5000/teachers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(teacher),
                });

                const data = await res.json();

                this.teachers = await this.fetchTeachers();
                this.store.dispatch('toggleAddTeacherForm');
            },
            async editTeacher(newTeacher) {
                const teacherToEdit = await this.fetchTeacher(newTeacher.id);;

                // Verifica se esiste già un insegnante con la stessa email
                if (newTeacher.email !== teacherToEdit.email) {
                    const isEmailExisting = await this.isEmailExists(newTeacher.email);
                    if (isEmailExisting && newTeacher.email !== teacherToEdit.email) {
                        this.store.dispatch('showAlert' , ["ERROR", "There is already a teacher with the same email", 5000])
                        return;
                    }
                }

                // Verifica se esiste già un insegnante con lo stesso numero di telefono
                if (newTeacher.phonenumber !== teacherToEdit.phonenumber) {
                    const isPhoneExisting = await this.isPhoneExists(newTeacher.phonenumber);
                    if (isPhoneExisting && newTeacher.phonenumber !== teacherToEdit.phonenumber) {
                        this.store.dispatch('showAlert' , ["ERROR", "There is already a teacher with the same phone number", 5000])
                        return;
                    }
                }

                const upTeacher = {
                    ...newTeacher,
                };

                const res = await fetch(`http://localhost:5000/teachers/${newTeacher.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(upTeacher),
                });

                const data = await res.json();

                // Aggiorna la lista degli insegnanti con il nuovo dato ricevuto dal server
                this.teachers = await this.fetchTeachers();

                this.store.dispatch('toggleEditTeacherForm')
                // console.log("after toggleTeacherForm function");
            },
            async deleteTeacher(id) {
                console.log(id, "id teacher to delete");
                // controllo che l'insegnante non abbia collegamenti ai corsi
                const hasAssignments = await this.fetchaAssignmentsTeacher(id);
                console.log(hasAssignments);

                if (hasAssignments) {
                    // se vero blocco il delete dell'insegnante
                    this.store.dispatch('showAlert' , ["ERROR", "Cannot delete teacher. There are assignments associated with this teacher", 5000])
                } else if(confirm('Are you sure?')) {
                    // altrimenti continua con il delete
                    const res = await fetch(`http://localhost:5000/teachers/${id}`, {
                    method: "DELETE",
                    })  

                    if (res.status === 200) {
                        this.teachers = await this.fetchTeachers();
                    } else {
                        this.store.dispatch('showAlert' , ["ERROR", "Error deleting teacher", 5000])
                    }

                }
            },
        },
    }
</script>

<template>
    <TeachersTable :teachers="teachers" @delete-teacher="deleteTeacher"/>
    <div v-show="this.store.state.teachers.showAddTeacherForm" class="form-container">
        <AddTeacherForm @create-teacher="createTeacher"/>
    </div>
    <div v-show="this.store.state.teachers.showEditTeacherForm" class="form-container">
        <EditTeacherForm @edit-teacher="editTeacher" :editingTeacher="this.store.state.teachers.editingTeacher"/>
    </div>
</template>


<style scoped>
    .form-container{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: 30px;
        align-items: center;
        position: absolute;
        top: 0;
        background-color: rgba(0,0,0,0.6);
        z-index: 100;
        backdrop-filter: blur(2px);
    }
</style>