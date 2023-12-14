import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminView from "../views/AdminView.vue";
import ForbiddenView from "../views/ForbiddenView.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    beforeEnter: (to, from, next) => {
      if (store.state.userData.roles.includes("ROLE_ADMIN")) {
        next();
      } else {
        next("/forbidden");
      }
    },
  },
  {
    path: "/forbidden",
    name: "forbidden",
    component: ForbiddenView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
