import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/releases",
    name: "Releases",
    component: () => import("../views/Releases.vue"),
  },
  {
    path: "/topsongs",
    name: "TopSongs",
    component: () => import("../views/TopSongs.vue"),
  },
  {
    path: "/me",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
