<template>
    <div style="margin-top: 47px; margin-bottom: 50px; min-height: 400px; width: 100%; display: flex; justify-content:center; align-items: center;">
        <v-skeleton-loader 
            boilerplate
            :loading="this.loading"
            max-width="800px"
            style="width: 100%; height: 100%;"
            type="heading, table-tfoot, table-tfoot, table-tfoot"
        >
            <PresencesTable :presences="presences" :courses="courses"/>
        </v-skeleton-loader>
    </div>
</template>

<script>
    const axios = require('axios');
  import PresencesTable from '../components/PresencesTable.vue'
  export default {
    data() {
      return {
        presences: [],
        courses: [],
        loading: true,
      };
    },
    components: {
        PresencesTable
    },
    methods: {
        async fetchPresences() {
            const apiUrl = `https://here-i-am.apps.coderit.it/api/presence`;
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
    },
    async created() {
        try {
            this.presences = await this.fetchPresences();
            this.courses = await this.fetchCourses();
            setInterval(() => {
                this.loading = false
            }, 300);
        } catch (error) {
            // Handle the error if needed
            console.error('Error in created hook:', error.message);
        }
    },
  };
</script>

<style scoped>

</style>