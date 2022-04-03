import { useMoonLightStore } from '@/stores/store';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("../views/Login/LoginPage.vue"),
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("../views/Home/HomePage.vue"),
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const store = useMoonLightStore();

  if (!store.$state.token && to.name !== 'Login') next({ name: 'Login' });
  else next();
})

export default router;
