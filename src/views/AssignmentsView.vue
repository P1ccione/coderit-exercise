<script>
    import AssignmentsTable from '../components/AssignmentsTable.vue';
    import AddAssignmentForm from '../components/AddAssignmentForm.vue';
    export default {
        name: "AssignmentsView",
        components: {
            AssignmentsTable,
            AddAssignmentForm
        },
        data() {
            return {
                assignments: [],
                teachers: [],
                courses: [],
                showAddAssignmentForm: false
            }
        },
        async created() {
            this.teachers = await this.fetchTeachers();
            console.log(this.teachers);
            this.assignments = await this.fetchaAssignments();
            console.log(this.assignments);
            this.courses = await this.fetchCourses();
            console.log(this.courses);
        },
        methods: {
            async fetchaAssignments() {
                const res = await fetch("http://localhost:5000/assignments")
                const data = await res.json()
                // Inverti l'array utilizzando il metodo reverse
                const reversedData = data.reverse();
                return reversedData;
            },
            async fetchCourses() {
                const res = await fetch("http://localhost:5000/courses")
                const data = await res.json()
                return data;
            },
            async fetchTeachers() {
                const res = await fetch("http://localhost:5000/teachers")
                const data = await res.json()
                return data;
            },
            async deleteAssignment(id) {
                if (confirm("Are you sure you want to delete this assignment?")) {
                    const res = await fetch(`http://localhost:5000/assignments/${id}`, {
                        method: "DELETE",
                    });

                    if (res.status === 200) {
                        this.assignments = this.assignments.filter((assignment) => assignment.id !== id);
                    } else {
                        this.$store.dispatch('showAlert' , ["ERROR", "Error deleting assignment", 5000])
                    }
                }
            },
            async isAssignmentExists(assignment) {
                // Effettua una chiamata API per verificare se esiste già un collegamento tra insegnante e corso
                const res = await fetch(`http://localhost:5000/assignments?idcourse=${assignment.idcourse}&idteacher=${assignment.idteacher}`);
                const data = await res.json();

                return data.length > 0; // Restituisce true se esiste già un collegamento tra insegnante e corso, altrimenti false
            },

            async createAssignment(assignment) {
                // Verifica se esiste già un collegamento tra insegnante e corso
                console.log(assignment);
                const isAssignmentExisting = await this.isAssignmentExists(assignment);
                if (isAssignmentExisting) {
                    this.$store.dispatch('showAlert' , ["ERROR", "There is already a assignment with this course and this teacher", 5000])
                    return;
                }

                const res = await fetch("http://localhost:5000/assignments", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(assignment),
                });

                const data = await res.json();

                this.assignments = await this.fetchaAssignments();
                this.$store.dispatch('toggleCreateAssignment')
            },
        },
    }
</script>

<template>
    <AssignmentsTable :assignments="assignments" :teachers="teachers" :courses="courses" @delete-assignment="deleteAssignment"/>
    <div v-show="this.$store.state.assignments.showAddAssignmentForm" class="form-container">
        <AddAssignmentForm :teachers="teachers" :courses="courses" @create-assignment="createAssignment"/>
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