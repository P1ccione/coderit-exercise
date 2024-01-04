<script>
    import TeacherAssignmentsTable from '../components/TeacherAssignmentsTable.vue';
    import { useStore } from 'vuex';
    const axios = require('axios');
    export default {
        name: "TeacherAssignmentsView",
        components: {
            TeacherAssignmentsTable,
        },
        data() {
            return {
                loading: true,
                assignments: [],
                store: useStore()
            }
        },
        async created() {
            this.assignments = await this.fetchaAssignmentsProfessor();
            console.log(this.assignments);

            setInterval(() => {
                this.loading = false
            }, 300);
        },
        methods: {
            async fetchaAssignmentsProfessor() {

                const teacher = await this.fetchTeacherId();

                const apiUrl = `https://here-i-am.apps.coderit.it/api/docenza/professore/${teacher.userId}`;
                const bearerToken = this.$keycloak.token;

                const config = {
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`,
                    },
                };

                try {
                    const response = await axios.get(apiUrl, config);
                    console.log('Response:', response.data);
                    const reversed = response.data.reverse();
                    return reversed;
                } catch (error) {
                    console.error('Error:', error.message);
                }
            },
            async fetchTeacherId() {
                const apiUrl = 'https://here-i-am.apps.coderit.it/api/users/me';
                const bearerToken = this.$keycloak.token;

                const config = {
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`,
                    },
                };

                try {
                    const response = await axios.get(apiUrl, config);
                    console.log('Response:', response.data);
                    return response.data;
                } catch (error) {
                    console.error('Error:', error.message);
                }
            },
        },
    }
</script>

<template>
    <div style="width: fit-content; margin-top: 47px; margin-bottom: 50px; min-height: 400px;">
        <div>
            <v-skeleton-loader 
                boilerplate
                :loading="this.loading"
                max-width="360px"
                type="heading, table-tfoot, table-tfoot, table-tfoot"
            >
                <TeacherAssignmentsTable :assignments="assignments"/>
            </v-skeleton-loader>
        </div>    
    </div>
</template>

<style scoped>
</style>