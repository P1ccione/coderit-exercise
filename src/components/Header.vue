<script>
    import { useStore } from 'vuex';
    import { useI18n } from 'vue-i18n'
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: "Header",
        setup() {
            const store = useStore();
            const { t } = useI18n() // use as global scope
            return {
                store,
                t
            };
        },
        data() {
            return {
                language: null
            }
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
            changeLanguage() {
                localStorage.setItem("lang", this.language)
                window.location.reload()
            }
        },
        created () {
            this.language = localStorage.getItem("lang")
        },
    }
</script>

<template>
    <v-container>
        <v-app-bar title="Here I Am">
            <template v-slot:append>
                <div class="links" role="navigation">

                    <label for="lang-select" class="sr-only">{{ $t('seleziona_lingua') }}</label>
                    <select id="lang-select" class="lang-select" v-model="language" @change="changeLanguage" :aria-label="$t('seleziona_lingua')">
                        <option value="en">EN</option>
                        <option value="it">IT</option>
                        <option value="es">ES</option>
                        <option value="de">DE</option>
                        <option value="fr">FR</option>
                    </select>

                    <v-btn variant="outlined" to="/" :aria-label="$t('link_pagina_home')">HOME</v-btn>

                    <v-btn variant="outlined" to="/teachers" v-if="this.store.state.global.userData.roles.includes('ROLE_ADMIN')" :aria-label="$t('link_pagina_professori')">{{ $t('professori') }}</v-btn>
                    <v-btn variant="outlined" to="/courses" v-if="this.store.state.global.userData.roles.includes('ROLE_ADMIN')" :aria-label="$t('link_pagina_corsi')">{{ $t('corsi') }}</v-btn>
                    <v-btn variant="outlined" to="/assignments" v-if="this.store.state.global.userData.roles.includes('ROLE_ADMIN')" :aria-label="$t('link_pagina_docenze')">{{ $t('docenze') }}</v-btn>
                    
                    <v-btn variant="outlined" @click="logout" aria-label="Logout">LOGOUT</v-btn>
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
    .lang-select {
        width: 30px;
        height: fit-content;
        outline: 1px solid #000;
        border-radius: 2px;
        text-align: center;
        font-size: 12px;
    }
</style>