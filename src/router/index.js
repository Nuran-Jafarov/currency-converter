import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    name: "Home",
    path: "/",
    meta: {
      name: "Converter",
      showInNavDrawer: true,
    },
    component: () => import(/* webpackChunkName: "Home" */ "@/views/Home"),
  },
  {
    name: "NotFound",
    path: "/not-found",
    alias: "*",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "@/views/NotFound"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
