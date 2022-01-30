import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("../views/Home.vue"),
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
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("../views/NotFound.vue"),
    },
  ]
})

export default router;
