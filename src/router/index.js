import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import LoginView from "../views/LoginView.vue";
import TeachersView from "../views/TeachersView.vue";
import CoursesView from "../views/CoursesView.vue";
import AssignmentsView from "../views/AssignmentsView.vue";
import Store from "../store/index.js";
import Auth0callback from "../views/Auth0callback.vue";
import Cookies from "js-cookie";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/courses",
    name: "courses",
    component: CoursesView,
    meta: { requiresAuth: true },
  },
  {
    path: "/assignments",
    name: "assignments",
    component: AssignmentsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/teachers",
    name: "teachers",
    component: TeachersView,
    meta: { requiresAuth: true },
  },
  {
    path: "/auth0callback",
    name: "auth0callback",
    component: Auth0callback,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Allow finishing callback url for logging in
  if (to.matched.some((record) => record.path == "/auth0callback")) {
    console.log("router.beforeEach found /auth0callback url");
    Store.dispatch("auth0HandleAuthentication");
    next(false);
  }

  // check if user is logged in (start assuming the user is not logged in = false)
  let routerAuthCheck = false;

  // Verify all the proper access variables are present for proper authorization
  const accessToken = Cookies.get("access_token");
  const idToken = Cookies.get("id_token");
  const expiresAt = Cookies.get("expires_at");

  if (accessToken && idToken && expiresAt) {
    console.log("found cookies tokens");
    // Check whether the current time is past the Access Token's expiry time
    routerAuthCheck = new Date().getTime() < JSON.parse(expiresAt);
    console.log(routerAuthCheck);
  }

  // set global ui understanding of authentication
  Store.commit("setUserIsAuthenticated", routerAuthCheck);

  // check if the route to be accessed requires authorization
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    if (routerAuthCheck) {
      // user is authenticated - allow access
      next();
    } else {
      // user is not authenticated - redirect to login
      router.replace("/login");
    }
  } else {
    // Allow the page to load
    next();
  }
});

export default router;
