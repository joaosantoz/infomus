import { createRouter, createWebHistory } from "vue-router";
import Releases from "../views/Releases.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Login,
  },
  {
    path: "/releases",
    name: "Releases",
    component: Releases,
  },
  {
    path: "/topsongs",
    name: "TopSongs",
    component: () => import("../views/TopSongs.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
