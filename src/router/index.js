import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    name: "NotFound",
    path: "/not-found",
    alias: "*",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "@/views/NotFound"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
