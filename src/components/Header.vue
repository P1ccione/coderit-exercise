<script>
    import { useStore } from 'vuex';
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: "Header",
        setup() {
            const store = useStore();
            return {
                store
            };
        },
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
        },
    }
</script>

<template>
    <v-container>
        <v-app-bar title="Here I Am">
            <template v-slot:append>
                <div class="links">
                    <v-btn variant="outlined" to="/" >HOME</v-btn>

                    <v-btn variant="outlined" to="/teachers" v-if="this.store.state.global.userData.roles.includes('ROLE_ADMIN')">TEACHERS</v-btn>
                    <v-btn variant="outlined" to="/courses" v-if="this.store.state.global.userData.roles.includes('ROLE_ADMIN')">COURSES</v-btn>
                    <v-btn variant="outlined" to="/assignments" v-if="this.store.state.global.userData.roles.includes('ROLE_ADMIN')">ASSIGNMENTS</v-btn>
                
                    <v-btn variant="outlined" @click="logout" >LOGOUT</v-btn>
                </div>
            </template>
        </v-app-bar>
    </v-container>
</template>

<style scoped>
    .links{
        width: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 20px;
    }
</style>