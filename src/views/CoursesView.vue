<template>
    <CoursesTable :courses="courses"/>
</template>

<script>
    import CoursesTable from '../components/CoursesTable.vue';
    export default {
        name: "CoursesView",
        components: {
            CoursesTable,
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
            // fetch dei dati nel file db.json dell'array teachers
            async fetchCourses() {
                const res = await fetch("http://localhost:5000/courses")
                const data = await res.json()
                return data;
            },
        },
    }
</script>

<style scoped>

</style>