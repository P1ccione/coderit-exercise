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
      mie_docenze: "MIE DOCENZE",
      corsi: "CORSI",
      docenze: "DOCENZE",
      agg_professore: "AGGIUNGI PROFESSORE",
      agg_admin: "AGGIUNGI ADMIN",
      agg_corso: "AGGIUNGI CORSO",
      agg_docenza: "AGGIUNGI DOCENZA",
      nome_professore: "Nome Professore",
      nome_corsista: "Nome Corsista",
      orario_presenza: "Orario Presenza al Corso",
      orario_qrcode: "Orario Attivazione QR-CODE",
      nome_admin: "Nome Admin",
      cognome_professore: "Cognome Professore",
      cognome_admin: "Cognome Admin",
      email_professore: "Email Professore",
      email_admin: "Email Admin",
      nome_corso: "Nome Corso",
      seleziona_professore: "Seleziona Professore",
      seleziona_corso: "Seleziona Corso",
      no_professori: "NESSUN PROFESSORE TROVATO",
      no_admins: "NESSUN ADMIN TROVATO",
      no_corsi: "NESSUN CORSO TROVATO",
      no_docenze: "NESSUNA DOCENZA TROVATA",
      no_presenze: "NESSUNA PRESENZA TROVATA",
      cerca_corso: "CERCA CORSO",
      cerca_professore: "CERCA PROFESSORE",
      cerca_admin: "CERCA ADMIN",
      seleziona_lingua: "Seleziona lingua",
      tabella_professori: "Tabella professori",
      tabella_admin: "Tabella admin",
      tabella_corsi: "Tabella corsi",
      tabella_docenze: "Tabella docenze",
      tabella_presenze: "Tabella presenze",
      form_modifica_professori: "Modulo di modifica professore",
      form_modifica_corsi: "Modulo di modifica corso",
      form_aggiunta_professori: "Modulo di aggiunta professore",
      form_aggiunta_admin: "Modulo di aggiunta admin",
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
      inizia_docenza: "AVVIA DOCENZA",
      errore_professore_esistente:
        "C'è già un professore con lo stesso indirizzo e-mail",
      errore_admin_esistente: "C'è già un admin con lo stesso indirizzo e-mail",
      errore_creazione_professore: "Errore nella creazione del professore:",
      successo_creazione_professore: "Successo nella creazione del professore",
      errore_creazione_admin: "Errore nella creazione dell'admin:",
      successo_creazione_admin: "Successo nella creazione dell'admin",
      errore_modifica_professore: "Errore nella modifica del professore:",
      successo_modifica_professore: "Successo nella modifica del professore",
      errore_docenze_professore:
        "Il professore ha delle docenze e non può essere cancellato",
      errore_eliminazione_professore:
        "Errore nell'eliminazione del professore:",
      successo_eliminazione_professore:
        "Successo nell'eliminazione del professore",
      errore_eliminazione_admin: "Errore nell'eliminazione dell'admin:",
      successo_eliminazione_admin: "Successo nell'eliminazione dell'admin",
      errore_corso_esistente: "C'è già un corso con lo stesso nome",
      errore_creazione_corso: "Errore nella creazione del corso:",
      successo_creazione_corso: "Successo nella creazione del corso",
      errore_modifica_corso: "Errore nella modifica del corso:",
      successo_modifica_corso: "Successo nella modifica del corso",
      errore_docenze_corso:
        "Il corso ha delle docenze e non può essere cancellato",
      errore_eliminazione_corso: "Errore nell'eliminazione del corso:",
      successo_eliminazione_corso: "Successo nell'eliminazione del corso",
      errore_docenza_esistente:
        "C'è già una docenza con lo stesso professore e lo stesso corso",
      errore_eliminazione_docenza: "Errore nell'eliminazione della docenza:",
      successo_eliminazione_docenza: "Successo nell'eliminazione della docenza",
      errore_creazione_docenza: "Errore nella creazione della docenza:",
      successo_creazione_docenza: "Successo nella creazione della docenza",
      conferma_eliminazione_corso: "È sicuro di voler cancellare questo corso?",
      conferma_eliminazione_professore:
        "È sicuro di voler cancellare questo professore?",
      conferma_eliminazione_admin: "È sicuro di voler cancellare questo admin?",
      conferma_eliminazione_docenza:
        "È sicuro di voler cancellare questa docenza?",
      link_pagina_home: "Link alla pagina home",
      link_pagina_professori: "Link alla pagina professori",
      link_pagina_corsi: "Link alla pagina corsi",
      link_pagina_docenze: "Link alla pagina docenze",
      elimina_professore: "Elimina professore",
      elimina_admin: "Elimina admin",
      elimina_corso: "Elimina corso",
      elimina_docenza: "Elimina docenza",
      modifica_professore: "Modifica professore",
      modifica_corso: "Modifica corso",
      azioni_form: "Azioni del form",
      reset_filtro_docenze: "Togli filtro docenze",
      successo: "SUCCESSO",
      forbidden_page: "NON SEI AUTORIZZATO AD ACCEDERE A QUESTA PAGINA",
      forbidden_button: "TORNA ALLA HOME",
      carousel_titolo: "A chi è rivolto?",
      enti_formativi_titolo: "Enti formativi",
      enti_formativi_testo:
        "che desiderano e/o necessitano di verificare che il corsista sia effettivamente presente al corso on-line e che possono utilizzare HIA a tale scopo, indipendentemente dalla piattaforma di e-learning o teleconferenza utilizzata;",
      corsisti_titolo: "Corsisti",
      corsisti_testo:
        "che seguono un corso in FAD la cui presenza effettiva è verificata da HIA, che sottopone lo studente a delle challenge più o meno interattive ed esplicite allo scopo di verificarne la presenza e il grado di attenzione.o che seguono un corso in FAD la cui presenza effettiva è verificata da HIA, che sottopone lo studente a delle challenge più o meno interattive ed esplicite allo scopo di verificarne la presenza e il grado di attenzione.",
      docenti_titolo: "Docenti",
      docenti_testo:
        "che erogano corsi in FAD che possono utilizzare HIA per eseguire una verifica di presenza esplicita, appelli automatizzati e avere indici di attenzione alla lezione in tempo reale.",
      piattaforme_e_learning_titolo: "Piattaforme di e-learning",
      piattaforme_e_learning_testo:
        "che hanno la necessità di integrare le funzionalità offerte da HIA senza doverle implementare ex-novo.",
      header_titolo: "Verifica che gli studenti stiano ascoltando",
      header_testo:
        '"Here I Am" propone un sistema in grado di verificare che uno studente che partecipa a una sessione di formazione online sia effettivamente presente.',
      inizia: "INIZIA",
      affidibilita_titolo: "Affidibilità",
      affidibilita_testo:
        "L'affidabilità è il nostro valore cardine. Siamo impegnati a fornire un servizio costantemente affidabile e di alta qualità ai nostri clienti. Ci sforziamo di mantenere le nostre promesse e di superare le aspettative, garantendo che ogni interazione con noi sia affidabile e soddisfacente.",
      sicurezza_titolo: "Sicurezza",
      sicurezza_testo:
        "La sicurezza è la nostra massima priorità. Mettiamo al primo posto la protezione dei vostri dati e la vostra privacy. Abbiamo implementato rigorose misure di sicurezza per garantire che le vostre informazioni siano al sicuro da accessi non autorizzati o utilizzi impropri.",
      facilita_titolo: "Facilità",
      facilita_testo:
        "La facilità è il nostro obiettivo principale. Siamo dedicati a fornire un'esperienza semplice e intuitiva ai nostri clienti. Abbiamo progettato i nostri servizi per essere accessibili e facili da utilizzare, eliminando ogni ostacolo o complicazione.",
    },
    en: {
      benvenuto: "Welcome",
      professori: "TEACHERS",
      mie_docenze: "MY LECTURES",
      corsi: "COURSES",
      docenze: "LECTURES",
      agg_professore: "ADD TEACHER",
      agg_admin: "ADD ADMIN",
      agg_corso: "ADD COURSE",
      agg_docenza: "ADD LECTURE",
      cerca_corso: "SEARCH COURSE",
      cerca_professore: "SEARCH TEACHER",
      cerca_admin: "SEARCH ADMIN",
      nome_professore: "Teacher First Name",
      nome_admin: "Admin First Name",
      cognome_professore: "Teacher Last Name",
      cognome_admin: "Admin Last Name",
      email_professore: "Teacher Email",
      nome_corsista: "Student Name",
      orario_presenza: "Course attendance time",
      orario_qrcode: "QR-CODE activation time",
      email_admin: "Admin Email",
      nome_corso: "Course Name",
      seleziona_professore: "Select Teacher",
      seleziona_corso: "Select Course",
      no_professori: "NO TEACHERS FOUND",
      no_padmins: "NO ADMINS FOUND",
      no_corsi: "NO COURSES FOUND",
      no_docenze: "NO LECTURES FOUND",
      no_presenze: "NO PRESENCES FOUND",
      seleziona_lingua: "Select language",
      tabella_professori: "Teachers table",
      tabella_admin: "Admins table",
      tabella_corsi: "Courses table",
      tabella_docenze: "Lectures language",
      tabella_presenze: "Presences language",
      form_modifica_professori: "Teacher edit form",
      form_modifica_corsi: "Course edit form",
      form_aggiunta_professori: "Teacher addition form",
      form_aggiunta_admin: "Admin addition form",
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
      inizia_docenza: "START LECTURE",
      errore_professore_esistente:
        "There is already a teacher with the same email",
      errore_admin_esistente: "There is already an admin with the same email",
      errore_creazione_professore: "Error creating teacher:",
      successo_creazione_professore: "Successfully created teacher",
      errore_creazione_admin: "Error creating admin:",
      successo_creazione_admin: "Successfully created admin",
      errore_modifica_professore: "Error editing teacher:",
      successo_modificato_professore: "Successfully edited teacher",
      errore_docenze_professore: "Professor has lectures and cannot be deleted",
      errore_eliminazione_professore: "Error deleting teacher:",
      successo_eliminazione_professore: "Successfully deleted teacher",
      errore_eliminazione_admin: "Error deleting admin:",
      successo_eliminazione_admin: "Successfully deleted admin",
      errore_corso_esistente: "There is already a course with the same name",
      errore_creazione_corso: "Error creating course:",
      successo_creazione_corso: "Successfully created course",
      errore_modifica_corso: "Error editing course:",
      successo_modifica_corso: "Successfully edited course",
      errore_docenze_corso: "Course has lectures and cannot be deleted",
      errore_eliminazione_corso: "Error deleting course:",
      successo_eliminazione_corso: "Successfully deleted course",
      errore_docenza_esistente:
        "There is already a lecture with this course and this teacher",
      errore_eliminazione_docenza: "Error deleting lecture:",
      successo_eliminazione_docenza: "Successfully deleted lecture",
      errore_creazione_docenza: "Error creating lecture:",
      successo_creazione_docenza: "Successfully created lecture",
      conferma_eliminazione_corso:
        "Are you sure you want to delete this course?",
      conferma_eliminazione_professore:
        "Are you sure you want to delete this teacher?",
      conferma_eliminazione_admin:
        "Are you sure you want to delete this admin?",
      conferma_eliminazione_docenza:
        "Are you sure you want to delete this lecture?",
      link_pagina_home: "Link to home page",
      link_pagina_professori: "Link to teachers page",
      link_pagina_corsi: "Link to courses page",
      link_pagina_docenze: "Link to lectures page",
      elimina_professore: "Delete teacher",
      elimina_admin: "Delete admin",
      elimina_corso: "Delete course",
      elimina_docenza: "Delete lecture",
      modifica_professore: "Edit teacher",
      modifica_corso: "Edit course",
      azioni_form: "Form actions",
      reset_filtro_docenze: "Reset lectures filter",
      successo: "SUCCESS",
      forbidden_page: "YOU ARE NOT ALLOWED TO ACCESS THAT PAGE",
      forbidden_button: "GO BACK HOME",
      carousel_titolo: "Who is it aimed at?",
      enti_formativi_titolo: "Training organisations",
      enti_formativi_testo:
        "who wish and/or need to verify that the trainee is actually present at the online course and who can use HIA for this purpose, regardless of the e-learning or teleconferencing platform used;",
      corsisti_titolo: "Trainees",
      corsisti_testo:
        "who follow an ODL course whose actual attendance is verified by HIA, which subjects the student to more or less interactive and explicit challenges in order to check their attendance and attention span.",
      docenti_titolo: "Teachers",
      docenti_testo:
        "that deliver ODL courses that can use HIA to perform explicit attendance verification, automated appeals and have real-time lecture attention rates.",
      piattaforme_e_learning_titolo: "E-learning platforms",
      piattaforme_e_learning_testo:
        "who need to integrate the functionalities offered by HIA without having to implement them from scratch.",
      header_titolo: "Check that the students are listening",
      header_testo:
        '"Here I Am" proposes a system that can verify that a student participating in an online training session is actually present.',
      inizia: "LETS START",
      affidibilita_titolo: "Dependability",
      affidibilita_testo:
        "Dependability is our core value. We are committed to providing a consistently reliable and high-quality service to our customers. We strive to deliver on our promises and exceed expectations, ensuring that every interaction with us is reliable and satisfying.",
      sicurezza_titolo: "Security",
      sicurezza_testo:
        "Security is our top priority. We put the protection of your data and your privacy first. We have implemented strict security measures to ensure that your information is safe from unauthorised access or misuse.",
      facilita_titolo: "Ease",
      facilita_testo:
        "Ease is our main goal. We are dedicated to providing a simple and intuitive experience for our customers. We have designed our services to be accessible and easy to use, removing any obstacles or complications.",
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
