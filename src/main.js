import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createAuth0 } from "@auth0/auth0-vue";

loadFonts();

const auth0 = createAuth0({
  domain: "dev-zw7nvrerdklscuqe.us.auth0.com",
  clientId: "zlYtZTtIyP6U6rMITDOE0pNZEOO6souf",
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
  scope: "openid profile email",
  audience: "{http://localhost:5000}",
});

createApp(App).use(router).use(store).use(auth0).use(vuetify).mount("#app");
