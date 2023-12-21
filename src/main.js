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

const languages = ["it", "en", "es", "de", "fr"];

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
      seleziona_lingua: "SELEZIONA LINGUA",
      tabella_professori: "TABELLA PROFESSORI",
      tabella_corsi: "TABELLA CORSI",
      tabella_docenze: "TABELLA DOCENZE",
      form_modifica_professori: "MODULO DI MODIFICA PROFESSORE",
      form_modifica_corsi: "MODULO DI MODIFICA CORSO",
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
    },
    en: {
      benvenuto: "Welcome",
      professori: "TEACHERS",
      corsi: "COURSES",
      docenze: "LECTURES",
      agg_professore: "ADD TEACHER",
      agg_corso: "ADD COURSE",
      agg_docenza: "ADD LECTURE",
      nome_professore: "Teacher First Name",
      cognome_professore: "Teacher Last Name",
      email_professore: "Teacher Email",
      nome_corso: "Course Name",
      seleziona_professore: "Select Teacher",
      seleziona_corso: "Select Course",
      no_professori: "NO TEACHERS FOUND",
      no_corsi: "NO COURSES FOUND",
      no_docenze: "NO LECTURES FOUND",
      seleziona_lingua: "SELECT LANGUAGE",
      tabella_professori: "TEACHERS TABLE",
      tabella_corsi: "COURSES TABLE",
      tabella_docenze: "LECTURES TABLE",
      form_modifica_professori: "TEACHER EDIT FORM",
      form_modifica_corsi: "COURSE EDIT FORM",
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
    },
    es: {
      benvenuto: "Bienvenido",
      professori: "PROFESORES",
      corsi: "CURSOS",
      docenze: "CONFERENCIAS",
      agg_professore: "AGREGAR PROFESOR",
      agg_corso: "AGREGAR CURSO",
      agg_docenza: "AGREGAR CONFERENCIA",
      nome_professore: "Nombre del Profesor",
      cognome_professore: "Apellido del Profesor",
      email_professore: "Correo Electrónico del Profesor",
      nome_corso: "Nombre del Curso",
      seleziona_professore: "Seleccionar Profesor",
      seleziona_corso: "Seleccionar Curso",
      no_professori: "NO SE ENCONTRARON PROFESORES",
      no_corsi: "NO SE ENCONTRARON CURSOS",
      no_docenze: "NO SE ENCONTRARON CONFERENCIAS",
      cerca_corso: "BUSCAR CURSO",
      cerca_professore: "BUSCAR PROFESOR",
      seleziona_lingua: "SELECCIONAR IDIOMA",
      tabella_professori: "TABLA DE PROFESORES",
      tabella_corsi: "TABLA DE CURSOS",
      tabella_docenze: "TABLA DE CONFERENCIAS",
      form_modifica_professori: "FORMULARIO DE EDICIÓN DE PROFESOR",
      form_modifica_corsi: "FORMULARIO DE EDICIÓN DE CURSO",
      invio: "ENVIAR",
      cancella: "BORRAR",
      chiudi: "CERRAR",
      elimina: "ELIMINAR",
      modifica: "MODIFICAR",
      colonna: "COLUMNA",
      riga: "FILA",
      errore: "ERROR",
      errore_professore_esistente:
        "Ya existe un profesor con el mismo correo electrónico",
      errore_creazione_professore: "Error al crear al profesor:",
      errore_modifica_professore: "Error al editar al profesor:",
      errore_docenze_professore:
        "El profesor tiene conferencias y no puede ser eliminado",
      errore_eliminazione_professore: "Error al eliminar al profesor:",
      errore_corso_esistente: "Ya existe un curso con el mismo nombre",
      errore_creazione_corso: "Error al crear el curso:",
      errore_modifica_corso: "Error al editar el curso:",
      errore_docenze_corso:
        "El curso tiene conferencias y no puede ser eliminado",
      errore_eliminazione_corso: "Error al eliminar el curso:",
      errore_docenza_esistente:
        "Ya existe una conferencia con este curso y este profesor",
      errore_eliminazione_docenza: "Error al eliminar la conferencia:",
      errore_creazione_docenza: "Error al crear la conferencia:",
      conferma_eliminazione_corso:
        "¿Estás seguro de que quieres eliminar este curso?",
      conferma_eliminazione_professore:
        "¿Estás seguro de que quieres eliminar este profesor?",
      conferma_eliminazione_docenza:
        "¿Estás seguro de que quieres eliminar esta conferencia?",
      link_pagina_home: "Enlace a la página de inicio",
      link_pagina_professori: "Enlace a la página de profesores",
      link_pagina_corsi: "Enlace a la página de cursos",
      link_pagina_docenze: "Enlace a la página de conferencias",
    },
    de: {
      benvenuto: "Willkommen",
      professori: "LEHRER",
      corsi: "KURSE",
      docenze: "VORLESUNGEN",
      agg_professore: "LEHRER HINZUFÜGEN",
      agg_corso: "KURS HINZUFÜGEN",
      agg_docenza: "VORLESUNG HINZUFÜGEN",
      nome_professore: "Vorname des Lehrers",
      cognome_professore: "Nachname des Lehrers",
      email_professore: "E-Mail des Lehrers",
      nome_corso: "Kursname",
      seleziona_professore: "Lehrer auswählen",
      seleziona_corso: "Kurs auswählen",
      no_professori: "KEINE LEHRER GEFUNDEN",
      no_corsi: "KEINE KURSE GEFUNDEN",
      no_docenze: "KEINE VORLESUNGEN GEFUNDEN",
      cerca_corso: "KURS SUCHEN",
      cerca_professore: "LEHRER SUCHEN",
      seleziona_lingua: "SPRACHE AUSWÄHLEN",
      tabella_professori: "LEHRERTABELLE",
      tabella_corsi: "KURSTABELLE",
      tabella_docenze: "VORLESUNGSTABELLE",
      form_modifica_professori: "LEHRERBEARBEITUNGSFORMULAR",
      form_modifica_corsi: "KURSBEARBEITUNGSFORMULAR",
      invio: "SENDEN",
      cancella: "LÖSCHEN",
      chiudi: "SCHLIEßEN",
      elimina: "LÖSCHEN",
      modifica: "BEARBEITEN",
      colonna: "SPALTE",
      riga: "REIHE",
      errore: "FEHLER",
      errore_professore_esistente:
        "Es gibt bereits einen Lehrer mit derselben E-Mail-Adresse",
      errore_creazione_professore: "Fehler beim Erstellen des Lehrers:",
      errore_modifica_professore: "Fehler beim Bearbeiten des Lehrers:",
      errore_docenze_professore:
        "Der Lehrer hat Vorlesungen und kann nicht gelöscht werden",
      errore_eliminazione_professore: "Fehler beim Löschen des Lehrers:",
      errore_corso_esistente: "Es gibt bereits einen Kurs mit demselben Namen",
      errore_creazione_corso: "Fehler beim Erstellen des Kurses:",
      errore_modifica_corso: "Fehler beim Bearbeiten des Kurses:",
      errore_docenze_corso:
        "Der Kurs hat Vorlesungen und kann nicht gelöscht werden",
      errore_eliminazione_corso: "Fehler beim Löschen des Kurses:",
      errore_docenza_esistente:
        "Es gibt bereits eine Vorlesung mit diesem Kurs und diesem Lehrer",
      errore_eliminazione_docenza: "Fehler beim Löschen der Vorlesung:",
      errore_creazione_docenza: "Fehler beim Erstellen der Vorlesung:",
      conferma_eliminazione_corso:
        "Sind Sie sicher, dass Sie diesen Kurs löschen möchten?",
      conferma_eliminazione_professore:
        "Sind Sie sicher, dass Sie diesen Lehrer löschen möchten?",
      conferma_eliminazione_docenza:
        "Sind Sie sicher, dass Sie diese Vorlesung löschen möchten?",
      link_pagina_home: "Link zur Startseite",
      link_pagina_professori: "Link zur Lehrerseite",
      link_pagina_corsi: "Link zur Kursseite",
      link_pagina_docenze: "Link zur Vorlesungsseite",
    },
    fr: {
      benvenuto: "Bienvenue",
      professori: "ENSEIGNANTS",
      corsi: "COURS",
      docenze: "CONFÉRENCES",
      agg_professore: "AJOUTER UN ENSEIGNANT",
      agg_corso: "AJOUTER UN COURS",
      agg_docenza: "AJOUTER UNE CONFÉRENCE",
      nome_professore: "Prénom de l'enseignant",
      cognome_professore: "Nom de famille de l'enseignant",
      email_professore: "Email de l'enseignant",
      nome_corso: "Nom du cours",
      seleziona_professore: "Sélectionner un enseignant",
      seleziona_corso: "Sélectionner un cours",
      no_professori: "AUCUN ENSEIGNANT TROUVÉ",
      no_corsi: "AUCUN COURS TROUVÉ",
      no_docenze: "AUCUNE CONFÉRENCE TROUVÉE",
      cerca_corso: "RECHERCHER UN COURS",
      cerca_professore: "RECHERCHER UN ENSEIGNANT",
      seleziona_lingua: "SÉLECTIONNER LA LANGUE",
      tabella_professori: "TABLEAU DES ENSEIGNANTS",
      tabella_corsi: "TABLEAU DES COURS",
      tabella_docenze: "TABLEAU DES CONFÉRENCES",
      form_modifica_professori: "FORMULAIRE DE MODIFICATION DE L'ENSEIGNANT",
      form_modifica_corsi: "FORMULAIRE DE MODIFICATION DE COURS",
      invio: "ENVOYER",
      cancella: "EFFACER",
      chiudi: "FERMER",
      elimina: "SUPPRIMER",
      modifica: "MODIFIER",
      colonna: "COLONNE",
      riga: "LIGNE",
      errore: "ERREUR",
      errore_professore_esistente:
        "Il existe déjà un enseignant avec la même adresse e-mail",
      errore_creazione_professore:
        "Erreur lors de la création de l'enseignant:",
      errore_modifica_professore:
        "Erreur lors de la modification de l'enseignant:",
      errore_docenze_professore:
        "L'enseignant a des conférences et ne peut pas être supprimé",
      errore_eliminazione_professore:
        "Erreur lors de la suppression de l'enseignant:",
      errore_corso_esistente: "Il existe déjà un cours avec le même nom",
      errore_creazione_corso: "Erreur lors de la création du cours:",
      errore_modifica_corso: "Erreur lors de la modification du cours:",
      errore_docenze_corso:
        "Le cours a des conférences et ne peut pas être supprimé",
      errore_eliminazione_corso: "Erreur lors de la suppression du cours:",
      errore_docenza_esistente:
        "Il existe déjà une conférence avec ce cours et cet enseignant",
      errore_eliminazione_docenza:
        "Erreur lors de la suppression de la conférence:",
      errore_creazione_docenza: "Erreur lors de la création de la conférence:",
      conferma_eliminazione_corso:
        "Êtes-vous sûr de vouloir supprimer ce cours?",
      conferma_eliminazione_professore:
        "Êtes-vous sûr de vouloir supprimer cet enseignant?",
      conferma_eliminazione_docenza:
        "Êtes-vous sûr de vouloir supprimer cette conférence?",
      link_pagina_home: "Lien vers la page d'accueil",
      link_pagina_professori: "Lien vers la page des enseignants",
      link_pagina_corsi: "Lien vers la page des cours",
      link_pagina_docenze: "Lien vers la page des conférences",
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
