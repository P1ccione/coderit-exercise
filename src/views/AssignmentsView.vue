<script>
    import AssignmentsTable from '../components/AssignmentsTable.vue';
    import AddAssignmentForm from '../components/AddAssignmentForm.vue';
    import { useStore } from 'vuex';
    const axios = require('axios');
    export default {
        name: "AssignmentsView",
        components: {
            AssignmentsTable,
            AddAssignmentForm
        },
        data() {
            return {
                loading: true,
                assignments: [],
                teachers: [],
                courses: [],
                showAddAssignmentForm: false,
                store: useStore()
            }
        },
        async created() {
            this.teachers = await this.fetchTeachers();
            console.log(this.teachers);
            this.assignments = await this.fetchaAssignments();
            console.log(this.assignments);
            this.courses = await this.fetchCourses();
            console.log(this.courses);
            setInterval(() => {
                this.loading = false
            }, 300);
        },
        methods: {
            async fetchaAssignments() {
                const apiUrl = 'https://here-i-am.apps.coderit.it/api/docenza';
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
            async fetchCourses() {
                const apiUrl = 'https://here-i-am.apps.coderit.it/api/module';
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
            async fetchTeachers() {
                const apiUrl = 'https://here-i-am.apps.coderit.it/api/professor';
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
            async deleteAssignment(assignment) {
                
                const [id, userId] = assignment;
                if(confirm(this.$t('conferma_eliminazione_docenza'))){
                    const apiUrl = `https://here-i-am.apps.coderit.it/api/docenza/${userId}/${id}`;
                    const bearerToken = this.$keycloak.token;

                    const config = {
                        headers: {
                            'Authorization': `Bearer ${bearerToken}`,
                        },
                    };

                    try {
                        // Effettua la richiesta DELETE
                        const response = await axios.delete(apiUrl, config);
                        console.log('Assignment deleted:', response.data);

                        this.assignments = await this.fetchaAssignments();
                    } catch (error) {
                        this.store.dispatch('showAlert' , [this.$t('errore'), `${this.$t('errore_eliminazione_docenza')} ${error.message}`, 5000])
                    }
                }
            },
            isAssignmentExists(userId, id) {
                let check = false;
                this.assignments.forEach(element => {
                    if(element.id === id && element.professore.userId === userId) {
                        console.log(element.id + " element.id - " + id + " id | " + element.professore.userId + " element.professore.userId - " + userId + " userId");
                        check = true
                    }
                });
                console.log(check + " check");
                return check
            },

            async createAssignment(assignment) {
                // Verifica se esiste già un collegamento tra insegnante e corso
                console.log(assignment);
                const isAssignmentExisting = this.isAssignmentExists(assignment.professorId, assignment.moduleId);
                if (isAssignmentExisting) {
                    this.store.dispatch('showAlert' , [this.$t('errore'), this.$t('errore_docenza_esistente'), 5000])
                    return;
                }

                const apiUrl = 'https://here-i-am.apps.coderit.it/api/docenza';
                const bearerToken = this.$keycloak.token;

                const config = {
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`,
                    },
                };

                try {
                    const response = await axios.post(apiUrl, assignment, config);
                    console.log('Assignment created:', response.data);
                    this.assignments = await this.fetchaAssignments();
                    this.store.dispatch('toggleCreateAssignment')
                } catch (error) {
                    this.store.dispatch('showAlert' , [this.$t('errore'), `${this.$t('errore_creazione_docenza')} ${error.message}`, 5000])
                }
            },
        },
    }
</script>

<template>
    <div style="width: fit-content;">
        <v-skeleton-loader 
            boilerplate
            :loading="this.loading"
            max-width="360px"
            type="heading, table-tfoot, table-tfoot, table-tfoot"
        >
            <AssignmentsTable :assignments="assignments" :teachers="teachers" :courses="courses" @delete-assignment="deleteAssignment"/>
        </v-skeleton-loader>
    </div>
    <div v-show="this.store.state.assignments.showAddAssignmentForm" class="form-container">
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