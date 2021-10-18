<template>
  <v-app>
    <home-system-bar />

    <home-app-bar />

    <home-view />

    <home-footer />

    <!--home-settings /-->
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
  export default {
    name: 'HomeLayout',
    mounted() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
      }
    },
    components: {
      HomeAppBar: () => import('@/layouts/home/AppBar'),
      HomeFooter: () => import('@/layouts/home/Footer'),
      HomeSettings: () => import('@/layouts/home/Settings'),
      HomeSystemBar: () => import('@/layouts/home/SystemBar'),
      HomeView: () => import('@/layouts/home/View'),
    },
    computed: {
      ...mapGetters([
        "isAuthenticated",
        "breadcrumbs",
        "pageTitle",
        "layoutConfig"
      ]),
    }
  }
</script>
