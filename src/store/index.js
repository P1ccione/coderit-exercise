import { createStore } from "vuex";
import auth0 from "auth0-js";
import router from "../router/index.js";
import Cookies from "js-cookie";

export default createStore({
  state: {
    userIsAuthorized: false,
    auth0: new auth0.WebAuth({
      domain: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN,
      clientID: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
      redirectUri: process.env.VUE_APP_DOMAINURL + "/auth0callback",
      responseType: process.env.VUE_APP_AUTH0_CONFIG_RESPONSETYPE,
      scope: process.env.VUE_APP_AUTH0_CONFIG_SCOPE,
    }),
  },
  getters: {},
  mutations: {
    setUserIsAuthenticated(state, replacement) {
      state.userIsAuthorized = replacement;
    },
  },
  actions: {
    auth0Login(context) {
      console.log("in a store action named auth0Login");
      context.state.auth0.authorize();
    },
    auth0HandleAuthentication(context) {
      context.state.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          let expiresAt = new Date().getTime() + authResult.expiresIn * 1000;

          // save the tokens in cookies
          Cookies.set("access_token", authResult.accessToken, {
            expires: new Date(expiresAt),
          });
          Cookies.set("id_token", authResult.idToken, {
            expires: new Date(expiresAt),
          });

          // save expires_at in cookies
          Cookies.set("expires_at", JSON.stringify(expiresAt), {
            expires: new Date(expiresAt),
          });

          router.replace("/members");
        } else if (err) {
          alert("login failed. Error #KJN838");
          router.replace("/login");
          console.log(err);
        }
      });
    },

    auth0Logout(context) {
      // Clear Access Token and ID Token from cookies
      Cookies.remove("access_token");
      Cookies.remove("id_token");
      Cookies.remove("expires_at");

      // redirect to auth0 logout to completely log the user out
      window.location.href =
        process.env.VUE_APP_AUTH0_CONFIG_DOMAINURL +
        "/v2/logout?returnTo=" +
        process.env.VUE_APP_DOMAINURL +
        "/login&client_id=" +
        process.env.VUE_APP_AUTH0_CONFIG_CLIENTID;
    },
  },
  modules: {},
});
