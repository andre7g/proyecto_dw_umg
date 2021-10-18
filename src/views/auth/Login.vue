<template>
    <div style="margin: 100px 20px 0px 20px">
                  <v-row>
                    <v-col cols="12" xs="12" sm="12" md="4"></v-col>
                    <v-col cols="12" xs="12" sm="12" md="4">
                        <v-card
                          max-width="500"
                          style="background-color: #F5F5F5;color: #283593"
                          class="font-weight-bold"
                        >

                          <v-divider class="mx-4"></v-divider>
                          <v-row style="margin-top: 10px">
                            <v-col cols="12" xs="12" sm="12" md="4"></v-col>
                            <v-col cols="12" xs="12" sm="12" md="4">
                                <h2 class="font-weight-bold d-flex justify-space-between text-caption">Bienvenido</h2>
                            </v-col>
                          </v-row>
                          <v-card-text>

                          <v-form
                                      ref="form"
                                      v-on:submit.prevent="login"
                                      v-model="validForm"
                                      >
                                          <v-card flat style="background-color: #F5F5F5;color: white" class="font-weight-bold">
                                              <v-card-text>
                                          <v-row>
                                              <v-col cols="12" md="12" sm="12" xs="12" class="pt-1 pb-1">
                                                  <v-text-field
                                                      outlined
                                                      autocomplete="off"
                                                      class="required"
                                                      dense
                                                      v-model="form.user"
                                                      label="Usuario"
                                                      :rules="[
                                                          required(
                                                              'Usuario'
                                                          )
                                                      ]"
                                                  ></v-text-field>
                                              </v-col>
                                              <v-col cols="12" md="12" sm="12" xs="12" class="pt-1 pb-1">
                                                <v-text-field
                                                    outlined
                                                    dense
                                                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                                    :rules="[
                                                        required(
                                                            'Contraseña'
                                                        )]"
                                                    v-model="form.pass"
                                                    :type="showPass ? 'text' : 'password'"   
                                                    label="Contraseña"
                                                    hint="Debe ingresa como maximo 50 caracteres"
                                                    class="input-group--focused"
                                                    @click:append="showPass = !showPass"

                                                ></v-text-field>
                                              </v-col>
                                          </v-row>
                                      </v-card-text>
                                      <v-divider></v-divider>
                                      <v-card-actions>
                                          <v-spacer></v-spacer>
                                                  <v-btn
                                                      block
                                                      depressed
                                                      elevation="2"
                                                      large
                                                      
                                                      rounded
                                                      class="mb-2 block red darken-1"
                                                      style="background-color: #283593;color: white"
                                                      type="submit"
                                                      :elevation="0" 
                                                      :disabled="!validForm" 
                                                      :loading="btnRegistroLoading"                         
                                                  >
                                                      Ingresar
                                                  </v-btn>
                                      </v-card-actions>
                                          </v-card>
                                          </v-form>   
                                  </v-card-text>

                          <v-card-actions>

                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
    <!--Inicio:: Snack alert-->
    <SnackAlert ref="snackalert"></SnackAlert>
    <!-- Fin:: Snack alert-->
  </div>
</template>



<!-- Load login custom page styles -->

<style lang="scss">

</style>

<script>

import SnackAlert from '@/views/content/SnackAlert.vue';
import SubHeader from "@/views/components/SubHeader"; 

import { mapGetters, mapState } from "vuex";
import { LOGIN, LOGOUT, REGISTER } from "@/services/store/auth.module";


import validations from "@/utils/validations.js";

export default {
  name: "login",
  components: {
    SnackAlert,
    SubHeader
  },
  data() {
    return {
      state: "signin",
      // Remove this dummy login info
      form: {
        user: '', //admin@demo.com
        pass: '' //demo
      },
      validForm:false,
      btnRegistroLoading:false,
      showPass :false,
      ...validations

    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    ...mapGetters(["currentUser"]),
  },
  methods: {
    async login(){
        this.btnRegistroLoading = true;
        //this.$store.dispatch(LOGOUT);
        await this.$store
          .dispatch(LOGIN, this.form)
          // go to which page after successfully login
          
          .then(res => { 
            console.log(res)
            if(res.status===200 && res.data.token){
              this.$router.push({ name: "Home" })
            } else {
              if(res.message){
                this.$refs.snackalert.SnackbarShow('warning', 'Error', res.message);
                
              } else {
                this.$refs.snackalert.SnackbarShow('warning', 'Alerta', res.mensaje);
              }
              //this.form.password='';
            }
            this.btnRegistroLoading = false;
            
            })
          .catch(() => {
             this.$refs.snackalert.SnackbarShow('warning', 'Mensaje', 'Ha ocurrido un error, por favor, ponte en contacto con el administrador del sistema.');
             this.form.pass='';
             this.btnRegistroLoading = false;
          });
    },
    register(){
      this.$store
          .dispatch(REGISTER, {
            correo: this.form.user,
            pass: this.form.pass
          })
          .then(() => this.$router.push({ name: "Home" }));
    }
  }
};
</script>
<style lang="scss">
.v-application {
  .s-none{
    display: none !important;
  }
}
</style>