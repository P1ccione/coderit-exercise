<script>
    import CoursesTable from '../components/CoursesTable.vue';
    import AddCourseForm from '../components/AddCourseForm.vue';
    export default {
        name: "CoursesView",
        components: {
            CoursesTable,
            AddCourseForm,
        },
        data() {
            return {
                courses: [],
                showAddCourseForm: false,
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
            toggleAddCourseForm() {
                this.showAddCourseForm = !this.showAddCourseForm
            },
            async isCourseExisting(coursename) {
              // Effettua una chiamata API per verificare se esiste già un corso con lo stesso nome
              const res = await fetch(`http://localhost:5000/courses?coursename=${coursename}`);
              const data = await res.json();

              return data.length > 0; // Restituisce true se esiste già un corso con lo stesso nome, altrimenti false
            },
            async createCourse(course) {
              // Verifica se esiste già un corso con lo stesso nome
              const isCourseExisting = await this.isCourseExisting(course.coursename);
              if (isCourseExisting) {
                  this.$emit('show-alert' , "ERROR", "There is already a course with the same name", 5000)
                  return;
              }

              const res = await fetch("http://localhost:5000/courses", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(course),
              });

              const data = await res.json();

              this.courses =  await this.fetchCourses();
              this.toggleAddCourseForm()
          },
        },
    }
</script>

<template>
    <CoursesTable :courses="courses" @toggle-add-course-form="toggleAddCourseForm"/>
    <div v-show="showAddCourseForm" class="form-container">
        <AddCourseForm @toggle-add-course-form="toggleAddCourseForm" @create-course="createCourse"/>
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
        z-index: 100000;
        backdrop-filter: blur(2px);
    }
</style>