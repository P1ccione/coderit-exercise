<script>
    import AdminsTable from '../components/AdminsTable.vue';
    import AddAdminForm from '../components/AddAdminForm.vue';
    const axios = require('axios');
    import { useI18n } from 'vue-i18n'
    import { useStore } from 'vuex';
    export default {
        name: "AdminsView",
        components: {
          AdminsTable,
            AddAdminForm,
        },
        data() {
            return {
                loading: true,
                admins: [],
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
                this.admins = await this.fetchAdmins();
                setInterval(() => {
                    this.loading = false
                }, 300);
            } catch (error) {
                // Handle the error if needed
                console.error('Error in created hook:', error.message);
            }
        },
        methods: {
            // fetch dei dati nel db degli admins
            async fetchAdmins() {
                const apiUrl = 'https://here-i-am.apps.coderit.it/api/admin';
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
            // funzione di fetch per prendere gli admin dal db per id
            async fetchAdmin(id) {
                const apiUrl = `https://here-i-am.apps.coderit.it/api/admin/${id}`;
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
            
            async createAdmin(admin) {
                // Verifica se esiste già un admin con la stessa userEmail
                const adminExists = this.admins.some(existingAdmin => existingAdmin.userEmail === admin.userEmail);
                
                if (adminExists) {
                    this.store.dispatch('showAlert' , [this.$t('errore'), this.$t('errore_admin_esistente'), 5000, "#c42116"])
                    return; // Non creare un nuovo admin se ne esiste già uno con la stessa userEmail #c42116
                }

                const apiUrl = 'https://here-i-am.apps.coderit.it/api/admin';
                const bearerToken = this.$keycloak.token;

                const config = {
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`,
                    },
                };

                try {
                    const response = await axios.post(apiUrl, admin, config);
                    console.log('Admin created:', response.data);
                    this.admins = await this.fetchAdmins();
                    this.store.dispatch('toggleAddAdminForm')
                } catch (error) {
                    this.store.dispatch('showAlert' , [this.$t('errore'), `${this.$t('errore_creazione_admin')} ${error.message}`, 5000, "#c42116"])
                }
            },
            async deleteAdmin(id) {

                if(confirm(this.$t('conferma_eliminazione_admin'))){
                    const apiUrl = `https://here-i-am.apps.coderit.it/api/admin/${id}`;
                    const bearerToken = this.$keycloak.token;

                    const config = {
                        headers: {
                            'Authorization': `Bearer ${bearerToken}`,
                        },
                    };

                    try {
                        // Effettua la richiesta DELETE
                        const response = await axios.delete(apiUrl, config);
                        console.log('Admin deleted:', response.data);

                        this.admins = await this.fetchAdmins();
                    } catch (error) {
                        this.store.dispatch('showAlert' , [this.$t('errore'), `${this.$t('errore_eliminazione_admin')} ${error.message}`, 5000, "#c42116"])
                    }
                }
            },
        },
    }
</script>

<template>
    <div style="margin-top: 47px; margin-bottom: 50px; min-height: 400px;">
        <div v-show="this.store.state.admins.ariaShowAdmin">
            <v-skeleton-loader 
                boilerplate
                :loading="this.loading"
                max-width="800px"
                type="heading, table-tfoot, table-tfoot, table-tfoot"
            >
                <AdminsTable :admins="admins" @delete-admin="deleteAdmin"/>
            </v-skeleton-loader>
        </div>
    </div>
    <div v-show="this.store.state.admins.showAddAdminForm" class="form-container">
        <AddAdminForm @create-admin="createAdmin"/>
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