<template>
  <v-app>
    <Header :userIsAuthorized="userIsAuthorized"/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      clientid: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
      domain: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN,
      userIsAuthorized: this.$store.state.userIsAuthorized
    }
  },
  beforeCreate() {

  },
}
</script>
