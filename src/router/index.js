// Imports
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/admin',
      component: () => import('@/layouts/home/Index.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/home/Index.vue'),
        },
        {
          path: 'empleados',
          name: 'empleados',
          component: () => import('@/views/admin/catalogos/empleados/AdminEmpleados.vue'),
        },
        {
          path: 'usuarios',
          name: 'usuarios',
          component: () => import('@/views/admin/catalogos/usuarios/AdminUsuarios.vue'),
        },
        {
          path: '*',
          name: 'FourOhFour',
          component: () => import('@/views/404/Index.vue'),
        },
      ],
    },
    {
      path: "/",
      component: () => import("@/views/auth/Login.vue"),
      children: [

        // {
        //   name: "mlogin",
        //   path: "/mlogin",
        //   component: () => import("@/views/auth/Login")
        // },
        {
          path: "login",
          name: "login",
          component: () => import("@/views/auth/Login.vue"),
        },
        // {
        //   name: "register",
        //   path: "/register",
        //   component: () => import("@/views/auth/Login")
        // }
      ]
    },

  ],
})

export default router
