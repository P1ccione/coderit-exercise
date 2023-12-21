<script>
    import CoursesTable from '../components/CoursesTable.vue';
    import AddCourseForm from '../components/AddCourseForm.vue';
    import EditCourseForm from '../components/EditCourseForm.vue';
    const axios = require('axios');
    import { useStore } from 'vuex';
    export default {
        name: "CoursesView",
        components: {
            CoursesTable,
            AddCourseForm,
            EditCourseForm,
        },
        data() {
            return {
                loading: true,
                firstLoad: true,
                courses: [],
                store: useStore(),
            }
        },
        async created() {
            this.courses = await this.fetchCourses();
            setInterval(() => {
                this.loading = false
            }, 300);
        },
        methods: {
            // fetch dei dati nel file db.json dell'array courses
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
            async fetchCourse(id) {
                const apiUrl = `https://here-i-am.apps.coderit.it/api/module/${id}`;
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
            async fetchaAssignmentsCourse(idcourse) {
              const res = await fetch(`http://localhost:5000/assignments?idcourse=${idcourse}`)

              const data = await res.json()

              return data.length > 0;
            },
            async deleteCourse(id) {
                if(confirm(this.$t('conferma_eliminazione_corso'))){
                    const apiUrl = `https://here-i-am.apps.coderit.it/api/module/${id}`;
                    const bearerToken = this.$keycloak.token;

                    const config = {
                        headers: {
                            'Authorization': `Bearer ${bearerToken}`,
                        },
                    };

                    try {
                        // Effettua la richiesta DELETE
                        const response = await axios.delete(apiUrl, config);
                        console.log('Course deleted:', response.data);

                        this.courses = await this.fetchCourses();
                    } catch (error) {
                        if(error.response.status === 404){
                            this.store.dispatch('showAlert' , [this.$t('errore'), this.$t('errore_docenze_corso'), 5000])
                        } else {
                            this.store.dispatch('showAlert' , [this.$t('errore'), `${this.$t('errore_eliminazione_corso')}  ${error.message}`, 5000])
                        }
                    }
                }
            },
            async createCourse(course) {
                // Verifica se esiste già un insegnante con la stessa userEmail
                const courseExists = this.courses.some(existingCourse => existingCourse.nome === course.nome);
                
                if (courseExists) {
                    this.store.dispatch('showAlert' , [this.$t('errore'), this.$t('errore_corso_esistente'), 5000])
                    return; // Non creare un nuovo insegnante se ne esiste già uno con la stessa userEmail
                }

                const apiUrl = 'https://here-i-am.apps.coderit.it/api/module';
                const bearerToken = this.$keycloak.token;

                const config = {
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`,
                    },
                };

                try {
                    console.log(course);
                    const response = await axios.post(apiUrl, course, config);
                    console.log('Course created:', response.data);
                    this.courses = await this.fetchCourses();
                    this.store.dispatch('toggleAddCourseForm')
                } catch (error) {
                    this.store.dispatch('showAlert' , [this.$t('errore'), `${this.$t('errore_creazione_corso')}  ${error.message}`, 5000])
                }
            },
            async editCourse(newCourse) {
                const [updatedCourse, id] = newCourse;

                const courseExists = this.courses.some(existingCourse => existingCourse.nome === updatedCourse.nome && existingCourse.id !== id);
                
                if (courseExists) {
                    this.store.dispatch('showAlert' , [this.$t('errore'), this.$t('errore_esistenza_corso'), 5000])
                    return;
                }

                const apiUrl = `https://here-i-am.apps.coderit.it/api/module/${id}`;
                const bearerToken = this.$keycloak.token;

                const config = {
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`,
                    },
                };

                try {
                    const response = await axios.put(apiUrl, updatedCourse, config);
                    console.log('Course updated:', response.data);

                    this.courses = await this.fetchCourses();
                    this.store.dispatch('toggleEditCourseForm')
                } catch (error) {
                    this.store.dispatch('showAlert' , [this.$t('errore'), `${this.$t('errore_modifica_corso')}  ${error.message}`, 5000])
                }
            }
        },
    }
</script>

<template>
    <div :aria-hidden="store.state.courses.ariaHiddenCourse">
        <v-skeleton-loader 
            boilerplate
            :loading="this.loading"
            max-width="360"
            type="heading, table-tfoot, table-tfoot, table-tfoot"
        >
            <CoursesTable :courses="courses" @toggle-add-course-form="this.store.dispatch('toggleAddCourseForm')" @delete-course="deleteCourse"/>
        </v-skeleton-loader>
    </div>
    <div v-show="this.store.state.courses.showAddCourseForm" class="form-container">
        <AddCourseForm @create-course="createCourse"/>
    </div>
    <div v-show="this.store.state.courses.showEditCourseForm" class="form-container">
        <EditCourseForm @edit-course="editCourse" :editingCourse="this.store.state.courses.editingCourse"/>
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