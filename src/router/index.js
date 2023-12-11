import { createRouter, createWebHistory } from "vue-router";
import TeachersView from "../views/TeachersView.vue";
import HomeView from "../views/HomeView.vue";
import CoursesView from "../views/CoursesView.vue";
import AssignmentsView from "../views/AssignmentsView.vue";
import ProfileView from "../views/ProfileView.vue";
import { authGuard, useAuth0 } from "@auth0/auth0-vue";
import Store from "../store/index.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    beforeEnter: authGuard,
  },
  {
    path: "/teachers",
    name: "teachers",
    component: TeachersView,
    beforeEnter: (to, from, next) => {
      console.log("before enter");
      // Verifica l'autenticazione con authGuard
      if (authGuard) {
        console.log("authgurad", authGuard);
        console.log(Store.state.global.admin);
        if (Store.state.global.admin) {
          next();
        } else {
          router.replace("/");
        }
      } else {
        router.replace("/login");
      }
    },
  },
  {
    path: "/courses",
    name: "courses",
    component: CoursesView,
    beforeEnter: (to, from, next) => {
      console.log("before enter");
      // Verifica l'autenticazione con authGuard
      if (authGuard) {
        console.log("authgurad", authGuard);
        if (Store.state.global.admin) {
          next();
        } else {
          router.replace("/");
        }
      } else {
        router.replace("/login");
      }
    },
  },
  {
    path: "/assignments",
    name: "assignments",
    component: AssignmentsView,
    beforeEnter: (to, from, next) => {
      console.log("before enter");
      // Verifica l'autenticazione con authGuard
      if (authGuard) {
        console.log("authgurad", authGuard);
        if (Store.state.global.admin) {
          next();
        } else {
          router.replace("/");
        }
      } else {
        router.replace("/login");
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
