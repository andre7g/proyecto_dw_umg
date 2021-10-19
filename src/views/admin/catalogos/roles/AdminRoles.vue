<template >
    <div style="margin: 10px;">
        <v-card :elevation="0">
            <v-card-title>
                <v-row class="col-md-12">
                    <v-col cols="12" sm="12" md="6" class="font-weight-black">
                        Administración de Roles
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                        <v-btn
                            color=""
                            dark
                            class="mb-2 float-right bg-light-blue"
                            
                            @click="modalNueva"
                        >
                            Crear nuevo
                        </v-btn>
                    </v-col> 
            
                </v-row>
                <v-row class="col-md-12 m-0 p-0">
                    <v-divider></v-divider>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12" md="8"></v-col>
                    <v-col cols="12" sm="12" md="4">
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Buscar"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-title>
                        
            <v-card-text>
                <v-data-table
                        :headers="headers"
                        :items="roles"
                        :search="search"
                        item-key="Id"
                        class="elevation-0"
                        :loading="tableLoading"
                        no-data-text="No hay datos para mostrar"
                        :footer-props="{
                            showFirstLastPage: true,
                            firstIcon: 'mdi-page-first',
                            lastIcon: 'mdi-page-last',
                            prevIcon: 'mdi-chevron-left',
                            nextIcon: 'mdi-chevron-right',
                            'items-per-page-text':'Registros por página',
                            pageText: '{0}-{1} de {2}' 
                        }"
                        :items-per-page="10"
                        dense
                    >
                    <template v-slot:item="{ item }">
                        <tr>
                            <td>{{ item.id }}</td>
                            <td>{{ item.rol }}</td>
                            <td>{{ item.descripcion }}</td>
                            <td>
                                <v-chip
                                        class="ma-2"
                                        :color="item.estados_Id === 1 ? 'teal' : 'orange' "
                                        text-color="white"
                                        small
                                    >
                                        {{item.estados.estado}}
                                </v-chip>
                            </td>
                            <td>
                                <v-btn class="ma-2" small tile outlined color="indigo" @click="obtenerDatosItem(item.id)">
                                    <v-icon left>mdi-pencil</v-icon> Actualizar
                                </v-btn>
                            </td>
                        </tr>
                    </template>

                </v-data-table>
            </v-card-text>
        </v-card>




    <!-- Inicio:: Dialog para mostrar los datos del usuario-->
    <v-dialog
        v-model="dialog"
        max-width="600px" 
        persistent 
        transition="dialog-bottom-transition"
        
    >
        
        <v-card scrollable>
            <v-card-title>
                {{modalTitle}}
                
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    :disabled="btnRegistroLoading"
                    @click="dialog = false; resetForm()"
                    class="float-right"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="p-10">
            <v-form
                ref="form"
                v-on:submit.prevent="registrarItem"
                v-model="validForm"
                >
                    <v-card flat>
                        <v-card-text class="p-4">
                        <SubHeader subHeaderTitle="Datos del Rol" />
                        <v-row>
                            <v-col  md="12" sm="12" class="pt-1 pb-1">
                                <v-text-field
                                    outlined
                                    autocomplete="off"
                                    class="required"
                                    dense
                                    v-model="datosRol.rol"
                                    label="Nombre"
                                    :rules="[
                                        required(
                                            'Nombre'
                                        ),
                                        maxLength(
                                            'Nombre',
                                            45
                                        ),
                                        minLength(
                                            'Nombre',
                                            3
                                        )
                                    ]"
                                ></v-text-field>
                            </v-col>
                    </v-row>
                        <v-row>
                            <v-col  md="12" sm="12" class="pt-1 pb-1">
                                <v-text-field
                                    outlined
                                    autocomplete="off"
                                    class="required"
                                    dense
                                    v-model="datosRol.descripcion"
                                    label="Descripción"
                                    :rules="[
                                        required(
                                            'Descripción'
                                        ),
                                        maxLength(
                                            'Descripción',
                                            45
                                        ),
                                        minLength(
                                            'Descripción',
                                            3
                                        )
                                    ]"
                                ></v-text-field>
                            </v-col>
                    </v-row>
                    <v-row>
                        <v-col  md="2" sm="12" class="pt-1 pb-1">
                             <label class="grey--text body-2">Estado</label>
                                <v-switch
                                    v-model="switchItemEstado"
                                    inset
                                    :label="switchItemEstado ? 'Activo' : 'Inactivo'"
                                    >
                                </v-switch>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                            <v-btn
                                color="grey lighten-5"
                                elevation="0"
                                class="mb-2 float-right grey lighten-5"
                                @click="dialog = false; resetForm()"
                                :disabled="btnRegistroLoading"
                            >
                                Cancelar
                            </v-btn>
                            <!--:disabled="!validDocForm" type="submit"-->
                            <v-btn
                                color="primary"
                                class="mb-2 float-right"
                                type="submit"
                                :elevation="0" 
                                :disabled="!validForm" 
                                :loading="btnRegistroLoading"                         
                            >
                                {{btnRegistroText}}
                            </v-btn>
                </v-card-actions>
                    </v-card>
                    </v-form>   
            </v-card-text>
        </v-card>
    </v-dialog>
    <!-- Fin:: Dialog para mostrar los datos del usuario-->

    <!--Dialog loader -->
    <dialog-loader
        :dialogVisible="dialogLoaderVisible"
        :text="dialogLoaderText"
    ></dialog-loader>
    <!---->

    <!--Inicio:: Snack alert-->
    <SnackAlert ref="snackalert"></SnackAlert>
    <!-- Fin:: Snack alert-->
    </div>
</template>
<script>
import validations from "@/utils/validations.js";
import moment from "moment";
import { SET_BREADCRUMB } from "@/services/store/breadcrumbs.module";
import { OBTENER_ROLES,OBTENER_ROL,REGISTRAR_ROL,ACTUALIZAR_ROL } from "@/services/store/rol.module";




import SnackAlert from '@/views/content/SnackAlert.vue';
import DialogLoader from "@/views/content/DialogLoader";
import SubHeader from "@/views/components/SubHeader"; 


export default {
    name: "AdminRoles",
    components: {
        "dialog-loader": DialogLoader,
        SnackAlert,
        SubHeader,
    },
    data() {
        return {
            search:'',
            validForm:false,
            itemName : "Rol",
            dialog: false,
            modalTitle: 'Registrar Rol',
            btnRegistroLoading: false,
            dialogLoaderVisible: false,
            dialogLoaderText: 'Obteniendo informacion....',
            btnRegistroText: 'Registrar Rol',
            accion: 1,
            roles:[],
            switchItemEstado: true,
            datosRol: {
                id: 0,
                rol: '',
                descripcion: '',
                estados_Id: 0,
            },
            tableLoading: false,
            ...validations
        } 
    }, 
    methods: {
        modalNueva(){
            this.accion =1;
            this.modalTitle='Registrar Rol';
            this.btnRegistroText='Registrar Rol';
            this.dialog=true;
        },

        resetForm(){
            this.datosRol = {
                id: 0,
                rol: '',
                descripcion: '',
                estados_Id: 0,
            };
            this.switchItemEstado = true;
        },
    

        //!Obtener el personal para la tabla
        obtnenerItems(){
            this.tableLoading = true;
            this.roles=[];
            
            this.$store
                .dispatch(OBTENER_ROLES)
                .then(res => {
                    if(res.status === 200){
                        this.roles = this.$store.state.rol.roles;
                    }
                    this.tableLoading =false;
                //console.log(this.etnias)
                })
                .catch(() => {
                    this.tableLoading = false;
                });

        },
        obtenerDatosItem(Id){
            this.dialogLoaderVisible=true;
            this.datosRol.id = Id;
            this.accion=2;
            this.modalTitle='Actualizar Empleado';
            this.btnRegistroText='Actualizar Empleado';

            this.$store
                .dispatch(OBTENER_ROL, Id)
                .then(() => {
                    this.datosRol = this.$store.state.rol.rol;
                    this.datosRol.estados_Id === 1 ? this.switchItemEstado = true : this.switchItemEstado = false;
                    this.dialog = true;
                    this.dialogLoaderVisible = false;
                })
                .catch(error => {
                    this.dialogLoaderVisible = false;
                });
        },

        async registrarItem(){           
            this.btnRegistroLoading=true;
            this.switchItemEstado ? this.datosRol.estados_Id = 1 : this.datosRol.estados_Id = 2;
            if(this.accion===1){
                this.datosRol.id = 0;
                await this.$store
                    .dispatch(REGISTRAR_ROL, this.datosRol)
                    .then(res => {
                        //console.log(res)
                        if(res.status===200){
                            this.obtnenerItems();
                            this.dialog=false;
                            this.$refs.snackalert.SnackbarShow('success', 'Mensaje', res.mensaje);
                            this.resetForm();
                            this.switchItemEstado = true;
                        } else {
                            this.$refs.snackalert.SnackbarShow('warning', 'Alerta', res.mensaje);
                        }
                        this.btnRegistroLoading=false;
                    })
                    .catch(error => {
                        this.$refs.snackalert.SnackbarShow('warning', 'Alerta', error);
                        this.btnRegistroLoading=false;
                    });
            } else {
                await this.$store
                .dispatch(ACTUALIZAR_ROL, this.datosRol)
                .then(res => {
                    if(res.status===200){                            
                        this.obtnenerItems();
                        this.dialog=false;
                        this.$refs.snackalert.SnackbarShow('success', 'Mensaje', res.mensaje);
                        this.resetForm();
                        this.switchItemEstado = true;
                    } else {
                        this.$refs.snackalert.SnackbarShow('warning', 'Alerta', res.mensaje);
                    }
                    this.btnRegistroLoading=false;
                })
                .catch(error => {
                    this.$refs.snackalert.SnackbarShow('warning', 'Alerta', error);
                    this.btnRegistroLoading=false;
                });
            }
        }
    },
    mounted() {
        //Definir el nombre en el breadcrumb
        this.$store.dispatch(SET_BREADCRUMB, [
            { title: "Administración", route: "/dashboard" },
            { title: "Catalogos" },
            { title: "Roles" }
        ]);
    },

    created(){
        this.obtnenerItems();
    },

    
    computed: {
        headers() {
            return [
                {
                    text: "Id",
                    align: "start",
                    sortable: true,
                    value: "id"
                },
                {
                    text: "Nombre",
                    value: "rol",
                },
                {
                    text: "Descripción",
                    value: "descripcion"
                },
                {
                    text: "Estado",
                    value: "estados.estado"
                },
                {
                    text: "Acciones",
                    value: "Acciones"
                }
            ]
        }
    }
}
</script>
<style lang="">
    
</style>