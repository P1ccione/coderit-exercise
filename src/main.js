import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Keycloak from "keycloak-js";

loadFonts();

const keycloak = new Keycloak({
  url: "http://127.0.0.1:8080/auth",
  realm: "vue-app",
  clientId: "app-vue",
  onLoad: "login-required",
  enableLogging: true,
});
console.log("Keycloak Configuration:", keycloak);
keycloak
  .init({ onLoad: keycloak.onLoad })
  .then((auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      console.log("Authenticated");

      createApp(App)
        .use(router)
        .use(store)
        .use(vuetify)
        .provide("keycloak", keycloak) // Provide keycloak instance globally
        .mount("#app");
    }

    // Token Refresh
    setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            console.log("Token refreshed" + refreshed);
          } else {
            console.warn(
              "Token not refreshed, valid for" +
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
    }, 6000);
  })
  .catch(() => {
    console.error("Authentication Failed");
  });
