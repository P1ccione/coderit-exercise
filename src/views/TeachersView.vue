<script>
    import TeachersTable from '../components/TeachersTable.vue';
    import AddTeacherForm from '../components/AddTeacherForm.vue';
    import EditTeacherForm from '../components/EditTeacherForm.vue';
    const axios = require('axios');
    import { useI18n } from 'vue-i18n'
    import { useStore } from 'vuex';
    export default {
        name: "TeachersView",
        components: {
            TeachersTable,
            AddTeacherForm,
            EditTeacherForm
        },
        data() {
            return {
                teachers: [],
                store: useStore()
            }
        },
        setup() {
            const { t } = useI18n() // use as global scope
            return {
                t
            }
        },
        async created() {
            try {
                this.teachers = await this.fetchTeachers();
            } catch (error) {
                // Handle the error if needed
                console.error('Error in created hook:', error.message);
            }
        },
        methods: {
            // fetch dei dati nel file db.json dell'array teachers
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
            // funzione di fetch per prendere i teachers dal db
            async fetchTeacher(id) {
                const apiUrl = `https://here-i-am.apps.coderit.it/api/professor/${id}`;
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

            async fetchAssignmentsTeacher(id) {
                const apiUrl = `https://here-i-am.apps.coderit.it/api/docenza/professore/${id}`;
                const bearerToken = this.$keycloak.token;

                const config = {
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`,
                    },
                };

                try {
                    const response = await axios.get(apiUrl, config);
                    console.log('Response:', response.data);
                    const data = response.data;
                    return data.length > 0;
                } catch (error) {
                    console.error('Error:', error.message);
                }
            },
            
            async createTeacher(teacher) {
                // Verifica se esiste già un insegnante con la stessa userEmail
                const teacherExists = this.teachers.some(existingTeacher => existingTeacher.userEmail === teacher.userEmail);
                
                if (teacherExists) {
                    this.store.dispatch('showAlert' , [this.$t('errore'), this.$t('errore_professore_esistente'), 5000])
                    return; // Non creare un nuovo insegnante se ne esiste già uno con la stessa userEmail
                }

                const apiUrl = 'https://here-i-am.apps.coderit.it/api/professor';
                const bearerToken = this.$keycloak.token;

                const config = {
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`,
                    },
                };

                try {
                    const response = await axios.post(apiUrl, teacher, config);
                    console.log('Teacher created:', response.data);
                    this.teachers = await this.fetchTeachers();
                    this.store.dispatch('toggleAddTeacherForm')
                } catch (error) {
                    this.store.dispatch('showAlert' , [this.$t('errore'), `${this.$t('errore_creazione_professore')} ${error.message}`, 5000])
                }
            },
            async editTeacher(newTeacher) {
                // Estrai le informazioni necessarie da newTeacher
                const [updatedTeacher, userId] = newTeacher;

                // Verifica se esiste già un insegnante con la stessa userEmail (escludendo il teacher corrente)
                const teacherExists = this.teachers.some(existingTeacher => 
                    existingTeacher.userEmail === updatedTeacher.userEmail && existingTeacher.userId !== userId
                );

                if (teacherExists) {
                    this.store.dispatch('showAlert' , [this.$t('errore'), this.$t('errore_professore_esistente'), 5000])
                    return; // Non modificare l'insegnante se ne esiste già uno con la stessa userEmail
                }

                const apiUrl = `https://here-i-am.apps.coderit.it/api/professor/${userId}`;
                const bearerToken = this.$keycloak.token;

                const config = {
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`,
                    },
                };

                try {
                    const response = await axios.put(apiUrl, updatedTeacher, config);
                    console.log('Teacher updated:', response.data);

                    this.teachers = await this.fetchTeachers();
                    this.store.dispatch('toggleEditTeacherForm')
                } catch (error) {
                    this.store.dispatch('showAlert' , [this.$t('errore'), `${this.$t('errore_modifica_professore')} ${error.message}`, 5000])
                }
            },
            async deleteTeacher(id) {
                // Controlla se il teacher ha docenze
                const hasAssignments = await this.fetchAssignmentsTeacher(id);

                if (hasAssignments) {
                    this.store.dispatch('showAlert' , [this.$t('errore'), this.$t('errore_docenze_professore'), 5000])
                    return; // Non eliminare l'insegnante se ha docenze
                }

                if(confirm(this.$t('conferma_eliminazione_professore'))){
                    const apiUrl = `https://here-i-am.apps.coderit.it/api/professor/${id}`;
                    const bearerToken = this.$keycloak.token;

                    const config = {
                        headers: {
                            'Authorization': `Bearer ${bearerToken}`,
                        },
                    };

                    try {
                        // Effettua la richiesta DELETE
                        const response = await axios.delete(apiUrl, config);
                        console.log('Teacher deleted:', response.data);

                        this.teachers = await this.fetchTeachers();
                    } catch (error) {
                        this.store.dispatch('showAlert' , [this.$t('errore'), `${this.$t('errore_eliminazione_professore')} ${error.message}`, 5000])
                    }
                }
            },
        },
    }
</script>

<template>
    <div>
        <TeachersTable :teachers="teachers" @delete-teacher="deleteTeacher"/>
    </div>
    <div v-show="this.store.state.teachers.showAddTeacherForm" class="form-container">
        <AddTeacherForm @create-teacher="createTeacher"/>
    </div>
    <div v-show="this.store.state.teachers.showEditTeacherForm" class="form-container">
        <EditTeacherForm @edit-teacher="editTeacher" :editingTeacher="this.store.state.teachers.editingTeacher"/>
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