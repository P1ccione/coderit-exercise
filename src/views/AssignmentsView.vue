<template>
   <AssignmentsContainer @toggle-create-assignment="toggleCreateAssignment" @edit-assignment="EditAssignmentForm" @delete-assignment="deleteAssignment" :assignments="assignments" :teachers="teachers" :courses="courses" @toggle-edit-assignment="toggleEditAssignmentForm" />
   <div class="form-container" v-show="showCreateAssignment">
        <AddAssignmentFrom @create-assignment="createAssignment" @toggle-create-assignment="toggleCreateAssignment"/>
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
        }
    }
</script>