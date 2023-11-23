<template>
  <v-app>
    <Header :userIsAuthorized="userIsAuthorized"/>
    <div class="alert-container">
      <Alert v-show="showAlertState" :title="title" :text="text" />
    </div>
    <v-main>
      <router-view @show-alert="showAlert"/>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import Alert from './components/Alert.vue';
export default {
  name: 'App',
  components: {
    Header,
    Alert,
  },
  data() {
    return {
      clientid: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
      domain: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN,
      userIsAuthorized: this.$store.state.userIsAuthorized,
      showAlertState: false,
      title: "",
      text: "",
    }
  },
  beforeCreate() {

  },
  methods: {
    showAlert(alerttitle, alerttext, timeout) {
      this.text = alerttext
      this.title = alerttitle
      this.showAlertState = true
      const self = this;

      setTimeout(function() {
        self.showAlertState = false;
      }, timeout);
    }
  }
}
</script>

<style scoped> 
.alert-container{
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999999;
} 
</style>