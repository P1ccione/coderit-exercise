<template>
    <div>
       
    </div>
</template>
<script>
    import { useAuth0 } from '@auth0/auth0-vue';
    export default {
        name: 'ProfileView',
        setup() {
            const { user, isAuthenticated, idTokenClaims, getAccessTokenSilently } = useAuth0();
            return {
                isAuthenticated,
                idTokenClaims,
                user,
            }
        },
        methods: {
        },
    }
</script>