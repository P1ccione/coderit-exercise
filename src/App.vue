<template>
  <v-app>
    <v-app-bar :elevation="2" title="vue-app keycloak">
        <template v-slot:append>
          <v-btn to="/" variant="outlined">HOME</v-btn>
      
          <v-btn to="/admin" variant="outlined">ADMIN</v-btn>
      
          <v-btn variant="outlined">LOGOUT</v-btn>
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
}
</script>
