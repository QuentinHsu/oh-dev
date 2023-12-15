import { createRouter, createWebHashHistory } from "vue-router";

const history = createWebHashHistory();

const router = createRouter({
  history,
  routes: [
    {
      path: "/",
      meta: { title: "" },
      component: () => import("@/views/Home/index.vue"),
    },
  ],
});
router.beforeEach((to) => {
  document.title = (to.meta.title as string) || "oh dev";
});

export default router;
