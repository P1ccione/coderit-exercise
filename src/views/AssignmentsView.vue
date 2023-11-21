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
                showAddAssignmentForm: true
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
                        this.$emit('show-alert' , "ERROR", "Error deleting assignment", 5000)
                    }
                }
            }
        },
    }
</script>

<template>
    <AssignmentsTable :assignments="assignments" :teachers="teachers" :courses="courses" @delete-assignment="deleteAssignment"/>
    <div v-show="showAddAssignmentForm" class="form-container">
        <AddAssignmentForm />
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