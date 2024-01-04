<script>
    import { useStore } from 'vuex';
    import { useI18n } from 'vue-i18n'
    import HereIamLogo from '@/assets/here-i-am-logo.svg';
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
                language: null,
                HereIamLogo: HereIamLogo,
                usersLinks: [this.$t('professori'),'ADMIN'],
                coursesLinks: [this.$t('corsi'),this.$t('docenze')],
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
            login () {
                if (this.$keycloak) {
                    this.$keycloak.login();
                } else {
                    console.error('Keycloak not initialized yet.');
                    // Handle the situation accordingly, e.g., redirect to a login page.
                }
            },
            changeLanguage() {
                localStorage.setItem("lang", this.language)
                window.location.reload()
            },
            getPageLink(item) {
                // Aggiungi la logica per determinare il link della pagina in base all'elemento
                // Puoi utilizzare un oggetto di mapping o altri criteri
                if (item === this.$t('professori')) {
                    return "/teachers";
                } else if (item === 'ADMIN') {
                    return "/admin";
                } else if (item === this.$t("corsi")) {
                    return "/courses";
                } else if (item === this.$t("docenze")) {
                    return "/assignments";
                }
                return "#"; // Link di fallback in caso di valore non riconosciuto
            },
        },
        created () {
            this.language = localStorage.getItem("lang")
        }
    }
</script>

<template>
    <v-container>
        <v-app-bar>
            <v-img
                class="mx-2"
                :src="HereIamLogo"
                max-height="40"
                max-width="40"
                contain
            ></v-img>

            <v-toolbar-title class="ml-2">
                HERE I AM
            </v-toolbar-title>
                        <template v-slot:append>
                <div class="links" role="navigation">

                    <label for="lang-select" class="sr-only">{{ $t('seleziona_lingua') }}</label>
                    <select id="lang-select" class="lang-select" v-model="language" @change="changeLanguage" :aria-label="$t('seleziona_lingua')">
                        <option value="it">IT</option>
                        <option value="en">EN</option>
                    </select>

                    <v-btn variant="outlined" to="/" :aria-label="$t('link_pagina_home')">HOME</v-btn>

                    <v-btn v-if="this.store.state.global.userData.roles.includes('ROLE_PROFESSOR')" variant="outlined" to="/teacher-assignments" :aria-label="$t('link_pagina_docenze')">{{ $t('mie_docenze') }}</v-btn>

                    <v-menu v-if="this.store.state.global.userData.roles.includes('ROLE_ADMIN')">
                        <template v-slot:activator="{ props }">
                            <v-btn
                                variant="outlined"
                                v-bind="props"
                            >
                                GESTIONE UTENZE
                                <v-icon end> mdi-menu-down </v-icon>
                            </v-btn>
                        </template>

                        <v-list class="bg-grey-lighten-3">
                            <v-list-item
                                v-for="item in usersLinks"
                                :key="item"
                                :to="getPageLink(item)"
                            >
                                {{ item }}
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-menu v-if="this.store.state.global.userData.roles.includes('ROLE_ADMIN')">
                        <template v-slot:activator="{ props }">
                            <v-btn
                                variant="outlined"
                                v-bind="props"
                            >
                                GESTIONE CORSI
                                <v-icon end> mdi-menu-down </v-icon>
                            </v-btn>
                        </template>

                        <v-list class="bg-grey-lighten-3">
                            <v-list-item
                                v-for="item in coursesLinks"
                                :key="item"
                                :to="getPageLink(item)"
                            >
                                {{ item }}
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-btn variant="outlined" v-if="!this.store.state.global.authorized" @click="login" aria-label="Login">LOGIN</v-btn>
                    <v-btn variant="outlined" v-else @click="logout" aria-label="Logout">LOGOUT</v-btn>
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

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }
</style>

<style>
 * {
    font-family: roboto;
 }
</style>