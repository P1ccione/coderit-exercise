<template>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; row-gap: 20px; margin-top: 47px;">
        <h2>QR-CODE</h2>
      <img v-if="QrCodeUrl" :src="QrCodeUrl" alt="QR Code" />
      <v-skeleton-loader 
            boilerplate
            :loading="this.loading"
            max-width="800px"
            type="heading, table-tfoot, table-tfoot, table-tfoot"
        >
            <LecturePresencesTable :presences="presences"/>
        </v-skeleton-loader>
    </div>
  </template>
  
  <script>
  const axios = require('axios');
import { useStore } from 'vuex';
  import LecturePresencesTable from '../components/LecturePresencesTable.vue'
  export default {
    data() {
      return {
        QrCodeUrl: null,
        presences: [],
        loading: true,
        store: useStore(),
      };
    },
    components: {
        LecturePresencesTable
    },
    methods: {
        async fetchQrCode(idLecture) {
            const apiUrl = `https://here-i-am.apps.coderit.it/api/corsi/${idLecture}`;
            const bearerToken = this.$keycloak.token;
    
            const config = {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Accept': 'image/png',
            },
            responseType: 'arraybuffer',
            };
    
            try {
            const response = await axios.get(apiUrl, config);
            console.log('Response:', response.data);
    
            const base64Image = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            this.QrCodeUrl = 'data:image/png;base64,' + base64Image;
    
            } catch (error) {
            console.error('Error:', error.message);
            }
        },
        async fetchPresences(idLecture) {

            const apiUrl = `https://here-i-am.apps.coderit.it/api/presence/${idLecture}`;
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
                this.presences = reversed;
            } catch (error) {
                console.error('Error:', error.message);
            }
        },
        reloadQrCode() {
            console.log(this.$route.query.lecture, "this.$route.query.lecture reloadQrCode");
            this.fetchQrCode(this.$route.query.lecture);
            this.fetchPresences(this.$route.query.lecture);
        },
    },
    mounted() {
        if(this.$route.query.lecture){
            console.log(this.$route.query.lecture, "this.$route.query.lecture mounted");
            this.fetchQrCode(this.$route.query.lecture);
            this.fetchPresences(this.$route.query.lecture);
            this.loading = false;
            this.store.dispatch('showAlert' , [this.$t('successo'), `${this.$t('successo_avviamento_docenza')}`, 5000, "#04c717"])
            setInterval(() => {
                this.reloadQrCode();
            }, 30000); // 30 secondi
        }else{
            window.location.href="/forbidden";
        }
    },
  };
  </script>