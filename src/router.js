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
          component: () => import("./components/CareList")
        },
        {
          path: "/mobile/user",
          component: () => import("./views/mobile/User")
        },
        {
          path: "/mobile/route/:id",
          component: () => import("./components/CareDetail")
        },
        {
          path: "/mobile/enroll/:id/:groupId",
          component: () => import("./components/Enroll")
        }
      ]
    },
    {
      path: "/index",
      component: () => import("./views/desktop/Index"),
      children: [
        {
          path: "/home",
          component: () => import("./components/CareList"),
          children: [
            {
              path: "/route/:id",
              component: () => import("./components/CareDetail")
            },
            {
              path: "/mobile/enroll/:id/:groupId",
              component: () => import("./components/Enroll")
            }
          ]
        }
      ]
    }
  ]
});
