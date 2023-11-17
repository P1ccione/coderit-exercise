import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TeachersView from "../views/TeachersView.vue";
import CoursesView from "../views/CoursesView.vue";
import AssignmentsView from "../views/AssignmentsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/teachers",
    name: "teachers",
    component: TeachersView,
  },
  {
    path: "/courses",
    name: "courses",
    component: CoursesView,
  },
  {
    path: "/assignments",
    name: "assignments",
    component: AssignmentsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
