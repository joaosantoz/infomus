import { createRouter, createWebHistory } from 'vue-router'
import { useStatsStore } from '../stores'

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
      name: "NotFound",
      component: () => import("../views/NotFoundPage.vue"),
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const store = useStatsStore();

  if (!store.$state.token && to.name !== 'Login') next({ name: 'Login' });
  else next();
})

export default router;
