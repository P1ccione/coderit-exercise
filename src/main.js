import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createAuth0 } from "@auth0/auth0-vue";

loadFonts();

const auth0 = createAuth0({
  domain: `${process.env.VUE_APP_AUTH0_CONFIG_DOMAIN}`,
  clientId: `${process.env.VUE_APP_AUTH0_CONFIG_CLIENTID}`,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
  scope: "openid profile email",
  audience: `{${process.env.VUE_APP_AUTH0_CONFIG_AUDIENCE}}`,
});

createApp(App).use(router).use(store).use(auth0).use(vuetify).mount("#app");
