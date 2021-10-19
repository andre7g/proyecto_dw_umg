<template>
  <div>
    <v-app-bar
      id="home-app-bar"
      app
      elevation="1"
      elevate-on-scroll
      height="80"
    >
    <template>
  <v-row justify="space-around">
    <v-menu
      offset-y
      max-width="200"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-tabs
          class="hidden-sm-and-down"
          optional
          background-color="transparent"
        >
          <v-tab
            class="font-weight-bold"
            min-width="96"
            v-bind="attrs"
            v-on="on"
          >
            Catálogos
          </v-tab>
          <v-tab
            class="font-weight-bold"
            min-width="96"
          >
            Consulta
          </v-tab>
        </v-tabs>
      </template>

      <v-list>
        <v-list-item to="empleados">
          <v-list-item-title>Empleados</v-list-item-title>
        </v-list-item>
        <v-list-item to="usuarios">
          <v-list-item-title>Usuarios</v-list-item-title>
        </v-list-item>
        <v-list-item to="roles">
          <v-list-item-title>Roles</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-menu>
  </v-row>
</template>
        <v-spacer />
        <template>
          <div class="text-center">
            <v-bottom-sheet>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon dark>
                    mdi-account-circle
                  </v-icon>
                </v-btn>
              </template>
              <!--v-card>
                <v-subheader>Open in</v-subheader>

              </v-card-->
              <v-card
                class="mx-auto my-12"
                max-width="400"
              >
                <template slot="progress">
                  <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                  ></v-progress-linear>
                </template>
                <v-card-title class="justify-center">JORGE ANDRÉ GUERRA GÁLVEZ</v-card-title>
                <v-card-text>
                      <v-row no-gutters>
                        <v-col
                          cols="12"
                          md="4"
                          sm="4"
                        >
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                          sm="4"
                        >
                          <v-avatar
                            color="primary"
                              size="100"
                          >
                            <v-icon
                              x-large
                              dark
                            >
                              mdi-account-circle
                            </v-icon>
                          </v-avatar>
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col
                          cols="12"
                          md="3"
                          sm="3"
                        >
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                          sm="6"
                        >
                            <p class="text-caption mt-1">
                              andre7.guerra@gmail.com
                            </p>
                        </v-col>
                      </v-row>
                  <v-divider class="my-3"></v-divider>
                </v-card-text>
                <v-card-actions>
                   <v-row no-gutters>
                        <v-col
                          cols="12"
                          md="3"
                          sm="3"
                        >
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                          sm="6"
                        >
                          <v-btn
                            color="red"
                            dark
                            rounded
                            block
                            @click="onLogout"
                          >
                            Salir
                          </v-btn>
                        </v-col>
                      </v-row>
                </v-card-actions>
              </v-card>
            </v-bottom-sheet>
          </div>
        </template>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      />
    </v-app-bar>

    <home-drawer
      v-model="drawer"
      :items="items"
    />
  </div>
</template>

<script>
import { LOGOUT } from "@/services/store/auth.module";
  export default {
    name: 'HomeAppBar',

    components: {
      HomeDrawer: () => import('./Drawer'),
    },

    data(){
      return{
        drawer: null,
        items: [
          'Home'
        ],
      };
    },
    methods: {
      onLogout() {
        this.$store
          .dispatch(LOGOUT)
          .then(() => this.$router.push({ name: "login" }));
      }
    }
  }
</script>

<style lang="sass">
  #home-app-bar
    .v-tabs-slider
      max-width: 24px
      margin: 0 auto

    .v-tab
      &::before
        display: none
</style>
