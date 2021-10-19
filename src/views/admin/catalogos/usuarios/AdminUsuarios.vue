<template >
    <div style="margin: 10px;">
        <v-card :elevation="0">
            <v-card-title>
                <v-row class="col-md-12">
                    <v-col cols="12" sm="12" md="6" class="font-weight-black">
                        Administración de Usuarios
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
                        :items="usuarios"
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
                            <td>{{ item.personal_administrativo.dpi }}</td>
                            <td>{{ item.personal_administrativo.primer_Nombre }} {{item.personal_administrativo.segundo_Nombre}} {{item.personal_administrativo.primer_Apellido}} {{item.personal_administrativo.segundo_Apellido}}</td>
                            <td>{{ item.personal_administrativo.telefono }}</td>
                            <td>{{ item.usuario }}</td>
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
                                    <v-icon left>mdi-pencil</v-icon> Cambiar contraseña
                                </v-btn>
                                <v-btn class="ma-2" small tile outlined color="indigo" @click="obtenerRolesUsuario(item.id)">
                                    <v-icon left>mdi-pencil</v-icon> Roles
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
        max-width="900px" 
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
                        <SubHeader subHeaderTitle="Datos del Usuario" />
                        <v-row>
                            <v-col cols="12" md="12" sm="12" class="pt-1 pb-1">
                                <v-select
                                    :disabled="cambiarContraseña"
                                    v-model="datosUsuario.personal_Administrativo_Id"
                                    :items="empleados"
                                    class="required"
                                    dense
                                    outlined
                                    label="Empleado"
                                    item-text="mostrar"
                                    item-value="id"
                                    :rules="[
                                        selectRequired(
                                            'Empleado'
                                        )
                                    ]"
                                    @change="obtenerDatosEmpleado"
                                
                                ></v-select>               
                            </v-col>
                        </v-row>
                        <v-row>
                        <v-col  md="3" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                :disabled="true"
                                outlined
                                autocomplete="off"
                                dense
                                v-model="primer_Nombre"
                                label="Primer Nombre"
                                :rules="[]"
                            ></v-text-field>
                        </v-col>
                        <v-col  md="3" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                :disabled="true"
                                outlined
                                autocomplete="off"
                                dense
                                v-model="segundo_Nombre"
                                label="Segundo Nombre"
                                :rules="[]"
                            ></v-text-field>
                        </v-col>
                        <v-col  md="3" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                :disabled="true"
                                outlined
                                autocomplete="off"
                                dense
                                v-model="primer_Apellido"
                                label="Primer Apellido"
                                :rules="[]"
                            ></v-text-field>
                        </v-col>
                        <v-col  md="3" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                :disabled="true"
                                outlined
                                autocomplete="off"
                                dense
                                v-model="segundo_Apellido"
                                label="Segundo Apellido"
                                :rules="[]"
                            ></v-text-field>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col  md="6" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                :disabled="true"
                                outlined
                                autocomplete="off"
                                dense
                                v-model="dpi"
                                label="DPI"
                                :rules="[]"
                            ></v-text-field>
                        </v-col>
                        <v-col  md="6" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                :disabled="true"
                                outlined
                                autocomplete="off"
                                dense
                                v-model="email"
                                label="Email"
                                :rules="[]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col  md="6" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                :disabled="cambiarContraseña"
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosUsuario.usuario"
                                label="Usuario"
                                :rules="[
                                    required(
                                        'Usuario'
                                    ),
                                    maxLength(
                                        'Usuario',
                                        20
                                    ),
                                    minLength(
                                        'Usuario',
                                        8
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col  md="6" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                dense
                                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[
                                    required(
                                        'Contraseña'
                                    ),
                                    maxLength(
                                        'Contraseña',
                                        50
                                    ),
                                    minLength(
                                        'Contraseña',
                                        8
                                    )]"
                                v-model="datosUsuario.password"
                                :type="showPass ? 'text' : 'password'"   
                                :label="contraseñaText"
                                hint="Debe ingresa como maximo 50 caracteres"
                                class="input-group--focused"
                                @click:append="showPass = !showPass"
                                                        
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
    
    <!-- Inicio:: Dialog para mostrar los datos del usuario-->
    <v-dialog
        v-model="dialogRoles"
        max-width="600px" 
        persistent 
        transition="dialog-bottom-transition"
        
    >
        
        <v-card scrollable>
            <v-card-title>
                Agregar Roles 
                
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    :disabled="btnRegistroRolesLoading"
                    @click="dialogRoles = false; resetFormRol()"
                    class="float-right"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="p-10">
            <v-form
                ref="form"
                v-on:submit.prevent="registrarRolesUsuario"
                v-model="validFormRoles"
                >
                    <v-card flat>
                        <v-card-text class="p-4">
                        <SubHeader subHeaderTitle="Seleccionar Rol" />
                        <v-row>
                            <v-col cols="12" md="12" sm="12" class="pt-1 pb-1">
                                <v-select
                                    v-model="datosUsuarioRoles.roles_Id"
                                    :items="roles"
                                    class="required"
                                    dense
                                    outlined
                                    label="Rol"
                                    item-text="rol"
                                    item-value="id"
                                    :rules="[
                                        selectRequired(
                                            'Rol'
                                        )
                                    ]"
                                ></v-select>               
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
                                @click="dialogRoles = false; resetFormRol()"
                                :disabled="btnRegistroRolesLoading"
                            >
                                Cancelar
                            </v-btn>
                            <!--:disabled="!validDocForm" type="submit"-->
                            <v-btn
                                color="primary"
                                class="mb-2 float-right"
                                type="submit"
                                :elevation="0" 
                                :disabled="!validFormRoles" 
                                :loading="btnRegistroRolesLoading"                         
                            >
                                Agregar
                            </v-btn>
                </v-card-actions>
                    </v-card>
                    </v-form>   
            </v-card-text>
        </v-card>
                <v-card>
            <v-card-text>
                <v-container>
                    <SubHeader :subHeaderTitle="`Roles registrados`" />
                    <v-data-table
                        :headers="rolesHeaders"
                        :items="usuariosRoles"
                        :items-per-page="10"
                        :loading="tableUsuarioRolesDocLoading"
                        class="elevation-1"
                        no-data-text="No hay roles registrados..."
                    >
                        <template v-slot:item="{ item }">
                            <tr> 
                                <td>{{ item.roles.rol }}</td>
                                <td>{{ item.roles.descripcion }}</td>
                            </tr>
                        </template>                    
                    </v-data-table>
                </v-container>
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
import { OBTENER_USUARIOS,OBTENER_USUARIO,REGISTRAR_USUARIO,ACTUALIZAR_USUARIO } from "@/services/store/usuario.module";
import { OBTENER_TIPOS_PERSONAL } from "@/services/store/tipopersonal.module";
import { OBTENER_PROFECIONES } from "@/services/store/profecion.module";
import { OBTENER_EMPLEADOS, OBTENER_EMPLEADO } from "@/services/store/personaladministrativo.module";
import { OBTENER_ROLES } from "@/services/store/rol.module";
import { OBTENER_ROLES_BY_USUARIO,REGISTRAR_ROL_USUARIO } from "@/services/store/usuariorol.module";

import SnackAlert from '@/views/content/SnackAlert.vue';
import DialogLoader from "@/views/content/DialogLoader";
import SubHeader from "@/views/components/SubHeader"; 


export default {
    name: "AdminUsuarios",
    components: {
        "dialog-loader": DialogLoader,
        SnackAlert,
        SubHeader,
    },
    data() {
        return {
            idUsiario:0,
            search:'',
            showPass :false,
            validForm:false,
            validFormRoles: false,
            cambiarContraseña:false,
            contraseñaText:'Contraseña',
            tableUsuarioRolesDocLoading:false,
            itemName : "Usuario",
            dialog: false,
            dialogRoles:false,
            modalTitle: 'Registrar Usuario',
            btnRegistroLoading: false,
            btnRegistroRolesLoading:false,

            tableRolesLoading:false,
            dialogLoaderVisible: false,
            dialogLoaderText: 'Obteniendo informacion....',
            btnRegistroText: 'Registrar Usuario',
            accion: 1,
            usuarios: [],

            roles:[],

            usuariosRoles:[],
            switchItemEstado: true,

            datosUsuario: {
                id: 0,
                usuario: '',
                password: '',
                estados_Id: 0,
                personal_Administrativo_Id: 0
            },
            datosUsuarioRoles: {
                id: 0,
                usuarios_Id: 0,
                roles_Id: 0,
                estados_Id: 1,
            },
            email: '',
            dpi: '',
            primer_Nombre: '',
            segundo_Nombre: '',
            primer_Apellido: '',
            segundo_Apellido: '',
            tableLoading: false,
            ...validations
        } 
    }, 
    methods: {
        modalNueva(){
            this.accion =1;
            this.modalTitle='Registrar Usuario';
            this.btnRegistroText='Registrar Usuario';
            this.dialog=true;
        },

        resetForm(){
            
            this.datosUsuario = {
                id: 0,
                usuario: '',
                password: '',
                estados_Id: 0,
                personal_Administrativo_Id: 0
            };
            this.switchItemEstado = true;
            this.email= '',
            this.dpi= '',
            this.primer_Nombre= '',
            this.segundo_Nombre= '',
            this.primer_Apellido= '',
            this.segundo_Apellido= '',
            this.cambiarContraseña = false;
            this.contraseñaText='Contraseña';
        },
        resetFormRol(){
            
            this.datosUsuarioRoles = {
                id: 0,
                usuarios_Id: 0,
                roles_Id: 0,
                estados_Id: 1,
            };
        },
    

        //!Obtener el personal para la tabla
        obtnenerItems(){
            this.tableLoading = true;
            this.usuarios=[];
            
            this.$store
                .dispatch(OBTENER_USUARIOS)
                .then(res => {
                    if(res.status === 200){
                        this.usuarios = this.$store.state.usuario.usuarios;
                    }
                    this.tableLoading =false;
                //console.log(this.etnias)
                })
                .catch(() => {
                    this.tableLoading = false;
                });

        },
        obtenerDatosEmpleado(){
            this.dialogLoaderVisible=true;
            this.$store
                .dispatch(OBTENER_EMPLEADO, this.datosUsuario.personal_Administrativo_Id)
                .then(() => {
                    let item =  this.$store.state.personaladministrativo.empleado;
                    this.primer_Nombre = item.primer_Nombre;
                    this.segundo_Nombre = item.segundo_Nombre;
                    this.primer_Apellido = item.primer_Apellido;
                    this.segundo_Apellido = item.segundo_Apellido;
                    this.dpi = item.dpi;
                    this.email = item.email;
                    this.dialogLoaderVisible = false;
                })
                .catch(error => {
                    this.dialogLoaderVisible = false;
                    console.log(error)
                });
        },
        //!Obtener el personal para el select
        obtnenerEmpleados(){
            this.empleados=[];     
            this.$store
                .dispatch(OBTENER_EMPLEADOS,1)
                .then(res => {
                    if(res.status === 200){
                        this.empleados = this.$store.state.personaladministrativo.empleados;
                    }
                })
                .catch(() => {
                    
                });
        },
        obtenerRoles(){
            this.roles=[]; 
            this.$store
                .dispatch(OBTENER_ROLES,1)
                .then(() => {
                    this.roles = this.$store.state.rol.roles;
                })
                .catch(error => {
                });
        },
        obtenerRolesByUsuario(){
            this.usuariosRoles=[]; 
            this.$store
                .dispatch(OBTENER_ROLES_BY_USUARIO,this.idUsiario)
                .then(() => {
                    this.usuariosRoles = this.$store.state.usuariorol.rolesUsuario;
                    console.log(this.usuariosRoles);
                })
                .catch(error => {
                });
        },
        obtenerDatosItem(Id){
            this.dialogLoaderVisible=true;
            this.datosUsuario.id = Id;
            this.accion=2;
            this.modalTitle='Actualizar Usuario';
            this.btnRegistroText='Actualizar Usuario';
            this.contraseñaText='Nueva Contraseña';
            this.cambiarContraseña = true;
            this.$store
                .dispatch(OBTENER_USUARIO, Id)
                .then(() => {
                    this.datosUsuario = this.$store.state.usuario.usuario;
                    this.datosUsuario.password = '';
                    this.datosUsuario.estados_Id === 1 ? this.switchItemEstado = true : this.switchItemEstado = false;
                    this.obtenerDatosEmpleado();
                    this.dialog = true;
                    this.dialogLoaderVisible = false;
                })
                .catch(error => {
                    this.dialogLoaderVisible = false;
                    console.log(error)
                });
        },
        async obtenerRolesUsuario(Id){
            //console.log(Id);
            this.dialogLoaderVisible=true;
            this.idUsiario = Id;
            await this.obtenerRolesByUsuario();
            this.dialogRoles = true;
            this.dialogLoaderVisible=false;
        },
        async registrarRolesUsuario(){
            this.btnRegistroRolesLoading=true;
            this.datosUsuarioRoles.usuarios_Id = this.idUsiario;
            await this.$store
            .dispatch(REGISTRAR_ROL_USUARIO, this.datosUsuarioRoles)
            .then(res => {
                if(res.status===200){
                    this.obtenerRolesByUsuario();
                    this.dialog=false;
                    this.$refs.snackalert.SnackbarShow('success', 'Mensaje', res.mensaje);
                    this.resetFormRol();
                } else {
                    this.$refs.snackalert.SnackbarShow('warning', 'Alerta', res.mensaje);
                }
                this.btnRegistroRolesLoading=false;
            })
            .catch(error => {
                this.$refs.snackalert.SnackbarShow('warning', 'Alerta', error);
                this.btnRegistroRolesLoading=false;
            });
        },
        
        async registrarItem(){           
            this.btnRegistroLoading=true;
            this.switchItemEstado ? this.datosUsuario.estados_Id = 1 : this.datosUsuario.estados_Id = 2;
            if(this.accion===1){
                this.datosUsuario.id = 0;
                await this.$store
                    .dispatch(REGISTRAR_USUARIO, this.datosUsuario)
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
                .dispatch(ACTUALIZAR_USUARIO, this.datosUsuario)
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
        this.obtnenerEmpleados();
        this.obtenerRoles();
    },

    
    computed: {
        headers() {
            return [
                {
                    text: "DPI",
                    align: "start",
                    sortable: true,
                    value: "dpi"
                },
                {
                    text: "Nombre Completo",
                    value: "primer_Apellido",
                },
                {
                    text: "Teléfono",
                    value: "telefono"
                },
                {
                    text: "Usuario",
                    value: "usuario"
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
        },
        rolesHeaders() {
            return [
                {
                    text: "Nombre",
                    value: "rol",
                },
                {
                    text: "Descripción",
                    value: "descripcion"
                }
            ]
        }
    }
}
</script>
<style lang="">
    
</style>