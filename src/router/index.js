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
      path: '/',
      redirect: "/Home",
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
          path: 'roles',
          name: 'roles',
          component: () => import('@/views/admin/catalogos/roles/AdminRoles.vue'),
        },
        {
          path: 'pacientes',
          name: 'pacientes',
          component: () => import('@/views/admin/catalogos/pacientes/AdminPacientes.vue'),
        },
        {
          path: 'productos',
          name: 'productos',
          component: () => import('@/views/admin/catalogos/productos/AdminProductos.vue'),
        },
        {
          path: 'habitaciones',
          name: 'habitaciones',
          component: () => import('@/views/admin/habitaciones/AdminHabitaciones.vue'),
        },
        {
          path: '*',
          name: 'FourOhFour',
          component: () => import('@/views/404/Index.vue'),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/Login.vue"),
    },

  ],
});

export default router
