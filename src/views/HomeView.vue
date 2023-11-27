<template>
  <div v-if="!isAuthenticated">
    <h2>Effettua il login</h2>
    <v-btn variant="outlined" @click="login">Log in</v-btn>
  </div>
  <div v-else >
    <h2>BENVENUTO !!</h2>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: 'HomeView',
  setup() {
    const { loginWithRedirect, isAuthenticated, idTokenClaims } = useAuth0();

    return {
      login: () => {
        loginWithRedirect();
      },
      isAuthenticated,
      idTokenClaims,
    };
  },
  components: {
  },
};
</script>
