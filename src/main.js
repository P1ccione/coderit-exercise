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

const languages = ["it", "en"];

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
      no_docenze: "NESSUNA DOCENZA TROVATA",
      cerca_corso: "CERCA CORSO",
      cerca_professore: "CERCA PROFESSORE",
      seleziona_lingua: "Seleziona lingua",
      tabella_professori: "Tabella professori",
      tabella_corsi: "Tabella corsi",
      tabella_docenze: "Tabella docenze",
      form_modifica_professori: "Modulo di modifica professore",
      form_modifica_corsi: "Modulo di modifica corso",
      form_aggiunta_professori: "Modulo di aggiunta professore",
      form_aggiunta_corsi: "Modulo di aggiunta corso",
      form_aggiunta_docenze: "Modulo di aggiunta docenza",
      invio: "INVIO",
      cancella: "CANCELLA",
      chiudi: "CHIUDI",
      elimina: "ELIMINA",
      modifica: "MODIFICA",
      colonna: "COLONNA",
      riga: "RIGA",
      errore: "ERRORE",
      errore_professore_esistente:
        "C'è già un professore con lo stesso indirizzo e-mail",
      errore_creazione_professore: "Errore nella creazione del professore:",
      errore_modifica_professore: "Errore nella modifica del professore:",
      errore_docenze_professore:
        "Il professore ha delle docenze e non può essere cancellato",
      errore_eliminazione_professore:
        "Errore nell'eliminazione del professore:",
      errore_corso_esistente: "C'è già un corso con lo stesso nome",
      errore_creazione_corso: "Errore nella creazione del corso:",
      errore_modifica_corso: "Errore nella modifica del corso:",
      errore_docenze_corso:
        "Il corso ha delle docenze e non può essere cancellato",
      errore_eliminazione_corso: "Errore nell'eliminazione del corso:",
      errore_docenza_esistente:
        "C'è già una docenza con lo stesso professore e lo stesso corso",
      errore_eliminazione_docenza: "Errore nell'eliminazione della docenza:",
      errore_creazione_docenza: "Errore nella creazione della docenza:",
      conferma_eliminazione_corso: "È sicuro di voler cancellare questo corso?",
      conferma_eliminazione_professore:
        "È sicuro di voler cancellare questo professore?",
      conferma_eliminazione_docenza:
        "È sicuro di voler cancellare questa docenza?",
      link_pagina_home: "Link alla pagina home",
      link_pagina_professori: "Link alla pagina professori",
      link_pagina_corsi: "Link alla pagina corsi",
      link_pagina_docenze: "Link alla pagina docenze",
      elimina_professore: "Elimina professore",
      elimina_corso: "Elimina corso",
      elimina_docenza: "Elimina docenza",
      modifica_professore: "Modifica professore",
      modifica_corso: "Modifica corso",
      azioni_form: "Azioni del form",
    },
    en: {
      benvenuto: "Welcome",
      professori: "TEACHERS",
      corsi: "COURSES",
      docenze: "LECTURES",
      agg_professore: "ADD TEACHER",
      agg_corso: "ADD COURSE",
      agg_docenza: "ADD LECTURE",
      cerca_corso: "SEARCH COURSE",
      cerca_professore: "SEARCH TEACHER",
      nome_professore: "Teacher First Name",
      cognome_professore: "Teacher Last Name",
      email_professore: "Teacher Email",
      nome_corso: "Course Name",
      seleziona_professore: "Select Teacher",
      seleziona_corso: "Select Course",
      no_professori: "NO TEACHERS FOUND",
      no_corsi: "NO COURSES FOUND",
      no_docenze: "NO LECTURES FOUND",
      seleziona_lingua: "Select language",
      tabella_professori: "Teachers table",
      tabella_corsi: "Course table",
      tabella_docenze: "Lectures language",
      form_modifica_professori: "Teacher edit form",
      form_modifica_corsi: "Course edit form",
      form_aggiunta_professori: "Teacher addition form",
      form_aggiunta_corsi: "Course addition form",
      form_aggiunta_docenze: "Lecture addition form",
      invio: "SUBMIT",
      cancella: "CLEAR",
      chiudi: "CLOSE",
      elimina: "DELETE",
      modifica: "EDIT",
      colonna: "COLUMN",
      riga: "ROW",
      errore: "ERROR",
      errore_professore_esistente:
        "There is already a teacher with the same email",
      errore_creazione_professore: "Error creating teacher:",
      errore_modifica_professore: "Error editing teacher:",
      errore_docenze_professore: "Professor has lectures and cannot be deleted",
      errore_eliminazione_professore: "Error deleting teacher:",
      errore_corso_esistente: "There is already a course with the same name",
      errore_creazione_corso: "Error creating course:",
      errore_modifica_corso: "Error editing course:",
      errore_docenze_corso: "Course has lectures and cannot be deleted",
      errore_eliminazione_corso: "Error deleting course:",
      errore_docenza_esistente:
        "There is already a lecture with this course and this teacher",
      errore_eliminazione_docenza: "Error deleting lecture:",
      errore_creazione_docenza: "Error creating lecture:",
      conferma_eliminazione_corso:
        "Are you sure you want to delete this course?",
      conferma_eliminazione_professore:
        "Are you sure you want to delete this teacher?",
      conferma_eliminazione_docenza:
        "Are you sure you want to delete this lecture?",
      link_pagina_home: "Link to home page",
      link_pagina_professori: "Link to teachers page",
      link_pagina_corsi: "Link to courses page",
      link_pagina_docenze: "Link to lectures page",
      elimina_professore: "Delete teacher",
      elimina_corso: "Delete course",
      elimina_docenza: "Delete lecture",
      modifica_professore: "Edit teacher",
      modifica_corso: "Edit course",
      azioni_form: "Form actions",
    },
  },
});

let initOptions = {
  url: "https://sso.here-i-am.apps.coderit.it/",
  realm: "here-i-am",
  clientId: "backoffice-fe",
  onLoad: "check-sso",
};

let keycloak = new Keycloak(initOptions);

keycloak
  .init({ onLoad: initOptions.onLoad })
  .then((auth) => {
    const app = createApp(App).use(router).use(store).use(vuetify).use(i18n);
    app.config.globalProperties.$keycloak = keycloak;
    app.mount("#app");

    if (auth) {
      console.log("Authenticated", auth);
      localStorage.setItem("vue-token", keycloak.token);
      localStorage.setItem("vue-refresh-token", keycloak.refreshToken);

      const token_decoded = VueJwtDecode.decode(keycloak.token);
      console.log(token_decoded);

      store.dispatch("store_lastname", token_decoded.family_name);
      store.dispatch("store_firstname", token_decoded.given_name);
      store.dispatch("store_email", token_decoded.email);
      store.dispatch("store_roles", token_decoded.realm_access.roles);
      store.dispatch("changeAuthorized", true);

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
    } else {
      store.dispatch("changeAuthorized", false);
    }
  })
  .catch(() => {
    console.error("Authenticated Failed");
  });
