<script>
    import { RouterLink, RouterView } from 'vue-router'
    export default {
        name: "Header"
    }
</script>

<template>
    <v-app-bar :elevation="2" title="TEACH-LINKER">
        <template v-slot:append>
            <div class="links">
                <v-btn variant="outlined" to="/">HOME</v-btn>
                <v-btn variant="outlined" to="/about">ABOUT</v-btn>
                <v-btn variant="outlined" to="/teachers">TEACHERS</v-btn>
                <v-btn variant="outlined" to="/courses">COURSES</v-btn>
                <v-btn variant="outlined" to="/assignments">ASSIGNMENTS</v-btn>
            </div>
        </template>
    </v-app-bar>
</template>

<style scoped>
 .links {
    display: flex;
    column-gap: 20px;
 }
</style>