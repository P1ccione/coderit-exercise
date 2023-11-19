<template>
   <AssignmentsContainer @toggle-create-assignment="toggleCreateAssignment" @delete-assignment="deleteAssignment" :assignments="assignments" :teachers="teachers" :courses="courses" @toggle-edit-assignment="toggleEditAssignmentForm" />
   <div class="form-container" v-show="showCreateAssignment">
        <AddAssignmentFrom @create-assignment="createAssignment" @toggle-create-assignment="toggleCreateAssignment" :courses="courses" :teachers="teachers"/>
    </div>
</template>

<script>

    import AssignmentsContainer from "../components/AssignmentsContainer"
    import AddAssignmentFrom from "../components/AddAssignmentFrom"

    export default {
        name: "AssignmentsView",
        components: {
            AssignmentsContainer,
            AddAssignmentFrom,
        },
        data() {
            return {
                assignments: [],
                teachers: [],
                courses: [],
                showCreateAssignment: false,
            }
        },
        async created() {
            this.assignments = await this.fetchaAssignments();
            this.teachers = await this.fetchTeachers();
            this.courses = await this.fetchCourses();
        },
        methods: {
            // fetch dei dati nel file db.json dell'array assignments
            async fetchaAssignments() {
                const res = await fetch("http://localhost:5000/assignments")

                const data = await res.json()

                return data;
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
                        alert("Error deleting assignment");
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
                    alert('Esiste già questo collegamento.');
                    return;
                }

                const res = await fetch("http://localhost:5000/assignments", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(assignment),
                });

                const data = await res.json();

                this.assignments = [...this.assignments, data];
                this.showCreateAssignment = !this.showCreateAssignment;
            },
            
            // toggle del form create assignment
            toggleCreateAssignment() {
                this.showCreateAssignment = !this.showCreateAssignment
            },
        }
    }
</script>