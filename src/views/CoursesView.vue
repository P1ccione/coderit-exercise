<script>
    import CoursesTable from '../components/CoursesTable.vue';
    import AddCourseForm from '../components/AddCourseForm.vue';
    import EditCourseForm from '../components/EditCourseForm.vue';
    export default {
        name: "CoursesView",
        components: {
            CoursesTable,
            AddCourseForm,
            EditCourseForm,
        },
        data() {
            return {
                courses: [],
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
                // Inverti l'array utilizzando il metodo reverse
                const reversedData = data.reverse();

                return reversedData;
            },
            async fetchCourse(id) {
                const res = await fetch(`http://localhost:5000/courses/${id}`)

                const data = await res.json()

                return data
            },
            async isCourseExisting(coursename) {
              // Effettua una chiamata API per verificare se esiste già un corso con lo stesso nome
              const res = await fetch(`http://localhost:5000/courses?coursename=${coursename}`);
              const data = await res.json();

              return data.length > 0; // Restituisce true se esiste già un corso con lo stesso nome, altrimenti false
            },
            async fetchaAssignmentsCourse(idcourse) {
              const res = await fetch(`http://localhost:5000/assignments?idcourse=${idcourse}`)

              const data = await res.json()

              return data.length > 0;
            },
            async deleteCourse(id) {
                const hasAssignments = await this.fetchaAssignmentsCourse(id);

                if (hasAssignments) {
                    this.$store.dispatch('showAlert' , ["ERROR", "Cannot delete course. There are assignments associated with this course", 5000])
                } else if (confirm("Are you sure you want to delete this course?")) {
                    const res = await fetch(`http://localhost:5000/courses/${id}`, {
                    method: "DELETE",
                    });

                    if (res.status === 200) {
                        this.courses = await this.fetchCourses();
                    } else {
                        this.$store.dispatch('showAlert' , ["ERROR", "Error deleting course", 5000])
                    }
                }
            },
            async createCourse(course) {
              // Verifica se esiste già un corso con lo stesso nome
              const isCourseExisting = await this.isCourseExisting(course.coursename);
              console.log(isCourseExisting, "isCourseExisting")
              console.log(course.coursename, "course.coursename")
              if (isCourseExisting) {
                    this.$store.dispatch('showAlert' , ["ERROR", "There is already a course with the same name", 5000])
                    return;
              }

              const res = await fetch("http://localhost:5000/courses", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(course),
              });

              const data = await res.json();

              this.courses =  await this.fetchCourses();
              this.$store.dispatch('toggleAddCourseForm')
            },
            async editCourse(newCourse) {
                const hasAssignments = await this.fetchaAssignmentsCourse(newCourse.id);

                if (hasAssignments && !confirm("This course has assignments. Are you sure to edit this course?")) {
                    return;
                }

                const courseToEdit = await this.fetchCourse(newCourse.id);

                // Se il nome del corso è cambiato, verifica se esiste già un corso con lo stesso nome
                if (newCourse.coursename !== courseToEdit.coursename) {
                const isCourseExisting = await this.isCourseExisting(newCourse.coursename);
                if (isCourseExisting) {
                    this.$store.dispatch('showAlert' , ["ERROR", "There is already a course with the same name", 5000])
                    return;
                }
                }

                const upCourse = {
                ...newCourse,
                };

                console.log(upCourse, "upCourse");
                console.log(newCourse, "newCourse");

                const res = await fetch(`http://localhost:5000/courses/${newCourse.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(upCourse),
                });

                const data = await res.json();

                // Aggiorna la lista dei corsi con il nuovo dato ricevuto dal server
                this.courses =  await this.fetchCourses();

                this.$store.dispatch('toggleEditCourseForm')
            },
        },
    }
</script>

<template>
    <CoursesTable :courses="courses" @toggle-add-course-form="this.$store.dispatch('toggleAddCourseForm')" @delete-course="deleteCourse"/>
    <div v-show="this.$store.state.showAddCourseForm" class="form-container">
        <AddCourseForm @create-course="createCourse"/>
    </div>
    <div v-show="this.$store.state.showEditCourseForm" class="form-container">
        <EditCourseForm @edit-course="editCourse" :editingCourse="this.$store.state.editingCourse"/>
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