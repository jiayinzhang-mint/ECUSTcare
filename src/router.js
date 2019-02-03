import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("./views/Login")
    },
    {
      path: "/index",
      component: () => import("./views/Index"),
      children: [
        {
          path: "/home",
          component: () => import("./views/Home")
        },
        {
          path: "/user",
          component: () => import("./views/User")
        },
        {
          path: "/route/:id",
          component: () => import("./views/Detail")
        }
      ]
    }
  ]
});
