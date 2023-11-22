<template>
    <v-app-bar :elevation="2" title="VUE AUTH0">
        <template v-slot:append>
            <div class="links">
                <v-btn variant="outlined" to="/">HOME</v-btn>
                <v-btn variant="outlined" to="/about">ABOUT</v-btn>
                <v-btn variant="outlined" to="/contacts">CONTACTS</v-btn>
                <v-btn variant="outlined" to="/members">MEMBERS</v-btn>
                <v-btn variant="outlined" to="/login">LOGIN</v-btn>
            </div>
        </template>
    </v-app-bar>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
 .links {
    display: flex;
    column-gap: 20px;
 }
</style>