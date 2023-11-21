<template>
    <TeachersTable :teachers="teachers"/>
</template>

<script>
    import TeachersTable from '../components/TeachersTable.vue';
    export default {
        name: "TeachersView",
        components: {
            TeachersTable,
        },
        data() {
            return {
            teachers: [],
            }
        },
        async created() {
            this.teachers = await this.fetchTeachers();
        },
        methods: {
            // fetch dei dati nel file db.json dell'array teachers
            async fetchTeachers() {
                const res = await fetch("http://localhost:5000/teachers")
                const data = await res.json()
                return data;
            },
        },
    }
</script>

<style scoped>

</style>