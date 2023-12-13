import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminView from "../views/AdminView.vue";
import ForbiddenView from "../views/ForbiddenView.vue";

const auth = true;

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
  },
  {
    path: "/forbidden",
    name: "forbidden",
    component: ForbiddenView,
    beforeEnter: (to, from, next) => {
      if (auth) {
        next();
      } else {
        next("/forbidden");
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
