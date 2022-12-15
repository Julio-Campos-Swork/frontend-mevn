// import Index from "@/views/Index.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAxiosStore } from "@/store/storeAxios";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("../views/Index.vue"),
    },
    {
      path: "/Protected",
      name: "Protected",
      component: () => import("../views/Protected.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/:catchAll(.*)*",
      component: () => import("../views/ErrorNotFound.vue"),
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  const authRequired = to.meta.auth;
  const useAxios = useAxiosStore();
  console.log(to)
  if (authRequired) {
    await useAxios.refreshToken('auth/refresh');
    if (useAxios.token) {
      return next();
    } else {
      return next("/");
    }
  }
  next();
});
export default router;
