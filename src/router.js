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
      path: "/mobile/index",
      component: () => import("./views/mobile/Index"),
      children: [
        {
          path: "/mobile/home",
          component: () => import("./views/mobile/Home")
        },
        {
          path: "/mobile/user",
          component: () => import("./views/mobile/User")
        },
        {
          path: "/mobile/route/:id",
          component: () => import("./views/mobile/Detail")
        }
      ]
    },
    {
      path: "/index",
      component: () => import("./views/desktop/Index"),
      children: [
        {
          path: "/home",
          component: () => import("./views/desktop/Home"),
          children: [
            {
              path: "/route/:id",
              component: () => import("./views/desktop/Detail")
            }
          ]
        }
      ]
    }
  ]
});
