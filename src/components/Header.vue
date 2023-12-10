<script>
    import { useAuth0 } from '@auth0/auth0-vue';
    import { useStore } from 'vuex';
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: "Header",
        setup() {
            const { loginWithRedirect } = useAuth0();
            const { isAuthenticated, idTokenClaims } = useAuth0();
            const { logout } = useAuth0();
            const store = useStore();
            return {
                login: () => {
                    loginWithRedirect();
                },
                logout: () => {
                    logout({ logoutParams: { returnTo: window.location.origin } });
                },
                isAuthenticated,
                idTokenClaims,
                store
            };
        }
    }
</script>

<template>
    <v-container>
        <v-app-bar title="TEACH-LINKER">
            <template v-slot:append>
                <div class="links">
                    <v-btn variant="outlined" to="/" >HOME</v-btn>

                    <v-btn variant="outlined" to="/teachers" v-if="this.store.state.global.admin">TAECHERS</v-btn>
                    <v-btn variant="outlined" to="/courses" v-if="this.store.state.global.admin">COURSES</v-btn>
                    <v-btn variant="outlined" to="/assignments" v-if="this.store.state.global.admin">ASSIGNMENTS</v-btn>

                    <v-btn variant="outlined" to="/profile" >PROFILE</v-btn>
                
                    <v-btn variant="outlined" v-if="isAuthenticated" @click="logout" >LOGOUT</v-btn>

                    <v-btn variant="outlined" v-else @click="login" >LOGIN</v-btn>

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