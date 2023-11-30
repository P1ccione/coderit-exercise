<template>
  <v-app>
    <Header/>
    <div class="alert-container" v-show="this.$store.state.showAlertState">
      <Alert :title="this.$store.state.global.alertTitle" :text="this.$store.state.global.alertText" />
    </div>
    <v-main>
      <div class="container">
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { watchEffect } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import Store from './store/index.js';
import Header from './components/Header.vue';
import Alert from './components/Alert.vue';
export default {
  setup() {
    const { user, isAuthenticated, idTokenClaims } = useAuth0();
    watchEffect(() => {
      if (isAuthenticated.value && user.value) {
        const userRoles = user.value[`${process.env.VUE_APP_AUTH0_CONFIG_AUDIENCE}/roles`];
        console.log(user.value);
          console.log("User roles", userRoles);
        if (userRoles) {
          console.log("User roles", userRoles);
          console.log(userRoles.length);
          userRoles.forEach(element => {
            if (element === "Admin") {
              console.log("Admin found");
              Store.dispatch("changeAdmin");
            }
          });
        }
      }
    });
    return {
      isAuthenticated,
      idTokenClaims
    }
  },
  name: 'App',
  components: {
    Header,
    Alert,
  },
  methods: {
  },
}
</script>

<style scoped>
  .container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .alert-container{
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999999;
} 
</style>