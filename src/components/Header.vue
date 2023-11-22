<template>
    <v-app-bar :elevation="2" title="TEACH-LINKER">
        <template v-slot:append>
            <div class="links">
                <v-btn variant="outlined" to="/">HOME</v-btn>
                <v-btn variant="outlined" to="/about">ABOUT</v-btn>
                <v-btn variant="outlined" to="/teachers" v-if="this.$store.state.userIsAuthorized">TEACHERS</v-btn>
                <v-btn variant="outlined" to="/courses" v-if="this.$store.state.userIsAuthorized">COURSES</v-btn>
                <v-btn variant="outlined" to="/assignments" v-if="this.$store.state.userIsAuthorized">ASSIGNMENTS</v-btn>
                <v-btn variant="outlined" @click="logout" v-if="this.$store.state.userIsAuthorized">LOGOUT</v-btn>
                <v-btn variant="outlined" to="/login" v-else>LOGIN</v-btn>
            </div>
        </template>
    </v-app-bar>
</template>

<script>
    export default {
        name: "Header",
        methods:{
            logout(){
            this.$store.dispatch('auth0Logout');
            console.log('logging out');
            }
        },
        props: {
        },
    }
</script>

<style scoped>
 .links {
    display: flex;
    column-gap: 20px;
 }
</style>