import { createRouter, createWebHashHistory } from "vue-router";
import { Home } from "@/views/home/route";

const history = createWebHashHistory();

const router = createRouter({
  history,
  routes: [
    {
      path: "/",
      meta: { title: "" },
      component: () => import("@/views/home/index.vue"),
      children: [...Home],
    },
  ],
});
router.beforeEach((to) => {
  document.title = (to.meta.title as string) || "oh dev";
});

export default router;
