<template>
  <v-app>
    <v-app-bar :elevation="2" title="vue-app keycloak">
        <template v-slot:append>
          <v-btn to="/" variant="outlined">HOME</v-btn>
      
          <v-btn to="/admin" variant="outlined">ADMIN</v-btn>
      
          <v-btn variant="outlined" @click="logout">LOGOUT</v-btn>
          <v-btn variant="outlined" @click="fetchUsers">DATA</v-btn>
        </template>
      </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    logout() {
      console.log('Attempting to logout. this.$keycloak:', this.$keycloak);
      if (this.$keycloak) {
        this.$keycloak.logout();
      } else {
        console.error('Keycloak not initialized yet.');
        // Handle the situation accordingly, e.g., redirect to a login page.
      }
    },
    async fetchUsers() {
      try {
        // Ensure that Keycloak is authenticated
        if (!this.$keycloak.authenticated) {
          await this.$keycloak.init({ onLoad: 'login-required' });
        }

        // Make the request with the Bearer token
        const response = await fetch('https://reqres.in/api/users/2', {
          headers: {
            accept: 'application/json',
            authorization: `Bearer ${this.$keycloak.token}`
          }
        });

        // Check if the request was successful (status code 2xx)
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          return data;
        } else {
          // Handle error cases
          console.error(`Error: ${response.status} - ${response.statusText}`);
          return null; // or throw an error
        }
      } catch (error) {
        console.error('Error:', error);
        return null; // or throw an error
      }
    }
  },
}
</script>
