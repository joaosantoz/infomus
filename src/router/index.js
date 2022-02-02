import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("../views/LoginPage.vue"),
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("../views/HomePage.vue"),
    },
    {
      path: "/releases",
      name: "Releases",
      component: () => import("../views/ReleasesPage.vue"),
    },
    {
      path: "/topsongs",
      name: "TopSongs",
      component: () => import("../views/TopSongsPage.vue"),
    },
    {
      path: "/me",
      name: "Profile",
      component: () => import("../views/ProfilePage.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("../views/NotFoundPage.vue"),
    },
    {
      path: "/teste",
      name: "teste",
      component: () => import("../views/TestePage.vue"),
    }
  ]
})

export default router;
