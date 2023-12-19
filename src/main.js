import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Keycloak from "keycloak-js";
import VueJwtDecode from "vue-jwt-decode";
import { createI18n } from "vue-i18n";

loadFonts();

const languages = ["it", "IT", "en", "EN"];

if (
  localStorage.getItem("lang") === null ||
  !languages.includes(localStorage.getItem("lang"))
) {
  localStorage.setItem("lang", "it");
}

const i18n = createI18n({
  locale: localStorage.getItem("lang"), // default locale
  allowComposition: true, // you need to specify that!
  messages: {
    it: {
      benvenuto: "Benvenuto",
      professori: "PROFESSORI",
      corsi: "CORSI",
      docenze: "DOCENZE",
      agg_professore: "AGGIUNGI PROFESSORE",
      agg_corso: "AGGIUNGI CORSO",
      agg_docenza: "AGGIUNGI DOCENZA",
      nome_professore: "Nome Professore",
      cognome_professore: "Cognome Professore",
      email_professore: "Email Professore",
      nome_corso: "Nome Corso",
      seleziona_professore: "Seleziona Professore",
      seleziona_corso: "Seleziona Corso",
      no_professori: "NESSUN PROFESSORE TROVATO",
      no_corsi: "NESSUN CORSO TROVATO",
      cerca_corso: "CERCA CORSO",
      cerca_professore: "CERCA PROFESSORE",
      seleziona_lingua: "SELEZIONA LINGUA",
      tabella_professori: "TABELLA PROFESSORI",
      invio: "INVIO",
      cancella: "CANCELLA",
      chiudi: "CHIUDI",
      elimina: "ELIMINA",
      modifica: "MODIFICA",
      colonna: "COLONNA",
      riga: "RIGA",
    },
    en: {
      benvenuto: "Welcome",
      professori: "TEACHERS",
      corsi: "COURSES",
      docenze: "ASSIGNMENTS",
      agg_professore: "ADD TEACHER",
      agg_corso: "ADD COURSE",
      agg_docenza: "ADD ASSIGNMENT",
      nome_professore: "Teacher First Name",
      cognome_professore: "Teacher Last Name",
      email_professore: "Teacher Email",
      nome_corso: "Course Name",
      seleziona_professore: "Select Teacher",
      seleziona_corso: "Select Course",
      no_professori: "NO TEACHERS FOUND",
      no_corsi: "NO COURSES FOUND",
      seleziona_lingua: "SELECT LANGUAGE",
      tabella_professori: "TEACHERS TABLE",
      invio: "SUBMIT",
      cancella: "CLEAR",
      chiudi: "CLOSE",
      elimina: "DELETE",
      modifica: "EDIT",
      colonna: "COLUMN",
      riga: "ROW",
    },
  },
});

let initOptions = {
  url: "https://sso.here-i-am.apps.coderit.it/",
  realm: "here-i-am",
  clientId: "backoffice-fe",
  onLoad: "login-required",
};

let keycloak = new Keycloak(initOptions);

keycloak
  .init({ onLoad: initOptions.onLoad })
  .then((auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      console.info("Authenticated");
    }

    const app = createApp(App).use(router).use(store).use(vuetify).use(i18n);
    app.config.globalProperties.$keycloak = keycloak;
    app.mount("#app");

    localStorage.setItem("vue-token", keycloak.token);
    localStorage.setItem("vue-refresh-token", keycloak.refreshToken);

    const token_decoded = VueJwtDecode.decode(keycloak.token);
    console.log(token_decoded);

    store.dispatch("store_lastname", token_decoded.family_name);
    store.dispatch("store_firstname", token_decoded.given_name);
    store.dispatch("store_email", token_decoded.email);
    store.dispatch("store_roles", token_decoded.realm_access.roles);

    console.log("firstname: " + store.state.global.userData.firstname);
    console.log("lastname: " + store.state.global.userData.lastname);
    console.log("email: " + store.state.global.userData.email);
    console.log("roles: " + store.state.global.userData.roles);

    setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            console.debug("Token refreshed" + refreshed);
          } else {
            console.warn(
              "Token not refreshed, valid for " +
                Math.round(
                  keycloak.tokenParsed.exp +
                    keycloak.timeSkew -
                    new Date().getTime() / 1000
                ) +
                " seconds"
            );
          }
        })
        .catch(() => {
          console.error("Failed to refresh token");
        });
    }, 60000);
  })
  .catch(() => {
    console.error("Authenticated Failed");
  });
