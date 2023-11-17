<template>
    <CoursesContainer @toggle-create-course="toggleCreateCourse" @edit-course="EditCourseForm" @delete-course="deleteCourse" :courses="courses" @toggle-edit-course="toggleEditCourseForm" />
      <div class="form-container" v-show="showCreateCourse">
        <AddCourseForm @create-course="createCourse" @toggle-create-course="toggleCreateCourse"/>
      </div>
      <div class="form-container" v-show="showEditCourseForm">
        <EditCourseForm @edit-course="EditCourseForm" @toggle-edit-course="toggleEditCourseForm" :course="editingCourse" />
      </div>
</template>

<script>

    import AddCourseForm from "../components/AddCourseForm"
    import CoursesContainer from "../components/CoursesContainer"
    import EditCourseForm from "../components/EditCourseForm"
    export default {
        name: "CoursesView",

        components: {
        AddCourseForm,
        CoursesContainer,
        EditCourseForm,
        },
        data() {
        return {
            courses: [],
            showCreateCourse: false,
            showEditCourseForm: false,
            editingCourse: null
        }
        },
        async created() {
            this.courses = await this.fetchCourses();
        },
        methods: {
        // fetch dei dati nel file db.json dell'array courses
        async fetchCourses() {
            const res = await fetch("http://localhost:5000/courses")

            const data = await res.json()

            return data;
        },
        async fetchCourse(id) {
            const res = await fetch(`http://localhost:5000/courses/${id}`)

            const data = await res.json()

            return data
        },
        async deleteCourse(id) {
            // console.log('task', id);
            if(confirm('Are you sure?')) {
                    
            const res = await fetch(`http://localhost:5000/courses/${id}`, {
                method: "DELETE",
            })

            res.status === 200 ? (this.courses = this.courses.filter((course) => course.id !== id)) : alert("Error deleting course")
            }
        },

        async isCourseExists(coursename) {
            // Effettua una chiamata API per verificare se esiste già un corso con lo stesso nome
            const res = await fetch(`http://localhost:5000/courses?coursename=${coursename}`);
            const data = await res.json();

            return data.length > 0; // Restituisce true se esiste già un corso con lo stesso nome, altrimenti false
        },

        async EditCourseForm(id, newCourse) {
            const courseToEdit = await this.fetchCourse(id);

            // Verifica se esiste già un corso con lo stesso nome
            const isCourseExisting = await this.isCourseExists(newCourse.coursename);
            if (isCourseExisting) {
                alert('Esiste già un corso con lo stesso nome.');
                return;
            }

            const upCourse = {
            id: courseToEdit.id,
            ...newCourse,
            };

            const res = await fetch(`http://localhost:5000/courses/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(upCourse),
            });

            const data = await res.json();

            // Aggiorna la lista dei corsi con il nuovo dato ricevuto dal server
            this.courses = this.courses.map((course) =>
            course.id === id ? { ...course, ...data } : course
            );

            this.showEditCourseForm = !this.showEditCourseForm
        },

        async createCourse(course) {
            // Verifica se esiste già un corso con lo stesso nome
            const isCourseExisting = await this.isCourseExists(course.coursename);
            if (isCourseExisting) {
                alert('Esiste già un corso con lo stesso nome.');
                return;
            }

            const res = await fetch("http://localhost:5000/courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(course),
            });

            const data = await res.json();

            this.courses = [...this.courses, data];
            this.showCreateCourse = !this.showCreateCourse;
        },
        
        // toggle del form create course
        toggleCreateCourse() {
            this.showCreateCourse = !this.showCreateCourse
        },

        toggleEditCourseForm(course) {
            this.editingCourse = course;
            this.showEditCourseForm = !this.showEditCourseForm
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
