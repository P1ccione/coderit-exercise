import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Keycloak from "keycloak-js";
import VueJwtDecode from "vue-jwt-decode";

loadFonts();

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

    const app = createApp(App).use(router).use(store).use(vuetify);
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

    console.log("firstname: " + store.state.userData.firstname);
    console.log("lastname: " + store.state.userData.lastname);
    console.log("email: " + store.state.userData.email);
    console.log("roles: " + store.state.userData.roles);

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
