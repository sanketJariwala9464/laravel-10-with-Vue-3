import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth.js";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../pages/home.vue"),
      }
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/login.vue"),
  },
  {
    path: '/admin',
    meta: { requiresAuth: true },
    component: () => import("../layouts/layout.vue"),
    children: [
      {
        path: "/admin",
        name: "admin",
        component: () => import("../pages/admin/dashboard.vue"),
      },
      {
        path: "/admin/contact",
        name: "contact",
        component: () => import("../pages/admin/contact.vue"),
      }
    ],
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getAuthDetails.isAuth) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    if (store.getAuthDetails.isAuth && store.getAuthDetails.token && to.name === 'login') {
      next({ name: "admin" });
    } else {
      next();
    }
  }
})

export default router;