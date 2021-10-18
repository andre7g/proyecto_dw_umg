<template >
    <div style="margin: 10px;">
        <v-card :elevation="0">
            <v-card-title>
                <v-row class="col-md-12">
                    <v-col cols="12" sm="12" md="6" class="font-weight-black">
                        Administración de Empleados
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
                        :items="empleados"
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
                            <td>{{ item.dpi }}</td>
                            <td>{{ item.primer_Nombre }} {{item.segundo_Nombre}} {{item.primer_Apellido}} {{item.segundo_Apellido}}</td>
                            <td>{{ item.telefono }}</td>
                            <td>{{ item.tipo_personal.tipo }}</td>
                            <td>{{ item.profecion.profecion }}</td>
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




    <!-- Inicio:: Dialog para mostrar los datos de la etnia-->
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
                        <SubHeader subHeaderTitle="Datos del Empleado" />
                        <v-row>
                        <v-col  md="3" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.primer_Nombre"
                                label="Primer Nombre"
                                :rules="[
                                    required(
                                        'Primer Nombre'
                                    ),
                                    maxLength(
                                        'Primer Nombre',
                                        45
                                    ),
                                    minLength(
                                        'Primer Nombre',
                                        3
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col  md="3" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.segundo_Nombre"
                                label="Segundo Nombre"
                                :rules="[
                                    required(
                                        'Segundo Nombre'
                                    ),
                                    maxLength(
                                        'Segundo Nombre',
                                        45
                                    ),
                                    minLength(
                                        'Segundo Nombre',
                                        3
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col  md="3" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.primer_Apellido"
                                label="Primer Apellido"
                                :rules="[
                                    required(
                                        'Primer Apellido'
                                    ),
                                    maxLength(
                                        'Primer Apellido',
                                        45
                                    ),
                                    minLength(
                                        'Primer Apellido',
                                        3
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col  md="3" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.segundo_Apellido"
                                label="Segundo Apellido"
                                :rules="[
                                    required(
                                        'Segundo Apellido'
                                    ),
                                    maxLength(
                                        'Segundo Apellido',
                                        45
                                    ),
                                    minLength(
                                        'Segundo Apellido',
                                        3
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col  md="6" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.dpi"
                                label="DPI"
                                :rules="[
                                    required(
                                        'DPI'
                                    ),
                                    onlyInteger(
                                        'DPI'
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col  md="6" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.email"
                                label="Email"
                                :rules="[
                                    required(
                                        'Email'
                                    ),
                                    validEmail(
                                        'Debe ingresar un correo valido.'
                                    )
                                    ,
                                    maxLength(
                                        'Email',
                                        40
                                    )
                                    
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" sm="12" class="pt-1 pb-1">
                            <v-menu
                                ref="menu1"
                                v-model="menuFechaNacimiento"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="auto"
                                :nudge-right="40"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        dense
                                        outlined
                                        autocomplete="off"
                                        :rules="[
                                          required(
                                            'Fecha de nacimiento'
                                            )
                                        ]"
                                        v-model="fechaNacimiento"
                                        label="Fecha de nacimiento"
                                        append-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        hint="DD-MM-YYYY"
                                        class="required"
                                        clearable
                                    ></v-text-field>
                                </template>
                                <v-date-picker 
                                    v-model="fechas.fechaNacimiento" 
                                    @change="menuFechaNacimiento = false" 
                                    :active-picker.sync="activePicker"
                                    locale="es"
                                    :max="maxDate()"
                                    min="1940-01-01"
                                    
                                ></v-date-picker>
                            </v-menu>
                        
                        </v-col>
                        <v-col  md="6" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.telefono"
                                label="Teléfono"
                                :rules="[
                                    required(
                                        'Teléfono'
                                    ),
                                    maxLength(
                                        'Teléfono',
                                        15
                                    ),
                                    phoneNumbers(
                                        'Teléfono'
                                    )
                                    
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col  md="6" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.no_Colegiado"
                                label="Número de Colegiado"
                                :rules="[
                                    required(
                                        'Número de Colegiado'
                                    ),
                                    maxLength(
                                        'Número de Colegiado',
                                        45
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col  md="6" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.salario"
                                label="Salario"
                                :rules="[
                                    required(
                                        'Salario'
                                    )
                                    ,    
                                    onlyDecimal(
                                        'Salario'
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
                                v-model="datosEmpleado.direccion"
                                label="Dirección"
                                :rules="[
                                    required(
                                        'Dirección del empleado'
                                    )
                                    ,
                                    maxLength(
                                        'Dirección del empleado',
                                        200
                                    ),
                                    minLength(
                                        'Dirección del empleado',
                                        3
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" sm="12" class="pt-1 pb-1">
                            <v-autocomplete
                                v-model="datosEmpleado.tipo_Personal_Id"
                                :items="tipoPersonal"
                                class="required"
                                dense
                                outlined
                                label="Tipo Personal"
                                item-text="tipo"
                                item-value="id"
                                :rules="[
                                    selectRequired(
                                        'Tipo Personal'
                                    )
                                ]"
                            
                            ></v-autocomplete>               
                        </v-col>
                        <v-col cols="12" md="6" sm="12" class="pt-1 pb-1">
                            <v-autocomplete
                                v-model="datosEmpleado.profecion_Id"
                                :items="profeciones"
                                class="required"
                                dense
                                outlined
                                label="Profeción"
                                item-text="profecion"
                                item-value="id"
                                :rules="[
                                    selectRequired(
                                        'Profeción'
                                    )
                                ]"
                            
                            ></v-autocomplete>               
                        </v-col>
                        
                    </v-row>
                    <v-row>
                        <v-col  md="12" sm="12" class="pt-1 pb-1">
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


    <!-- Fin:: Dialog para mostrar los datos del empleado-->

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
import { OBTENER_EMPLEADOS,REGISTRAR_EMPLEADO,OBTENER_EMPLEADO,ACTUALIZAR_EMPLEADO } from "@/services/store/personaladministrativo.module";
import { OBTENER_TIPOS_PERSONAL } from "@/services/store/tipopersonal.module";
import { OBTENER_PROFECIONES } from "@/services/store/profecion.module";


import SnackAlert from '@/views/content/SnackAlert.vue';
import DialogLoader from "@/views/content/DialogLoader";
import SubHeader from "@/views/components/SubHeader"; 


export default {
    name: "AdminEmpleados",
    components: {
        "dialog-loader": DialogLoader,
        SnackAlert,
        SubHeader,
    },
    data() {
        return {
            search:'',
            validForm:false,
            validRolesForm: false,
            itemName : "Empleado",
            dialog: false,
            modalTitle: 'Registrar Empleado',
            btnRegistroLoading: false,

            dialogLoaderVisible: false,
            dialogLoaderText: 'Obteniendo informacion....',
            btnRegistroText: 'Registrar Empleado',
            accion: 1,
            empleados: [],
            tipoPersonal:[],
            profeciones:[],
            switchItemEstado: true,

            //dateMin: moment('1920-01-01').format('MM-DD-YYYY'),
            fechas: {
                fechaNacimiento: ''
            },
            menuFechaNacimiento:false,
            activePicker: null,

            datosEmpleado: {
                id: 0,
                primer_Nombre: '',
                segundo_Nombre: '',
                primer_Apellido: '',
                segundo_Apellido: '',
                direccion: '',
                telefono: '',
                no_Colegiado: '',
                fecha_Nacimiento: '',
                salario: 0,
                estados_Id: 0,
                profecion_Id: 0,
                tipo_Personal_Id: 0,
                clinica_Id: 1,
                email: '',
                dpi: 0,
            },
            tableLoading: false,
            ...validations
        } 
    }, 
    methods: {
        maxDate() {
            const date = new Date();
            date.setFullYear(date.getFullYear() - 18);
            return date.toISOString().substr(0, 10);
        },
        minDate() {
            const date = new Date();
            date.setFullYear(date.getFullYear() - 60);
            return date.toISOString().substr(0, 10);
        },

        modalNueva(){
            this.accion =1;
            this.modalTitle='Registrar Empleado';
            this.btnRegistroText='Registrar Empleado';
            this.dialog=true;
        },

        resetForm(){
            
            this.datosEmpleado = {
                id: 0,
                primer_Nombre: '',
                segundo_Nombre: '',
                primer_Apellido: '',
                segundo_Apellido: '',
                direccion: '',
                telefono: '',
                no_Colegiado: '',
                fecha_Nacimiento: '',
                salario: 0,
                estados_Id: 0,
                profecion_Id: 0,
                tipo_Personal_Id: 0,
                clinica_Id: 1,
                email: '',
                dpi: 0,
            };

            this.switchItemEstado = true;
            this.fechas.fechaNacimiento = '';
        },
    

        //!Obtener el personal para la tabla
        obtnenerItems(){
            this.tableLoading = true;
            this.empleados=[];
            
            this.$store
                .dispatch(OBTENER_EMPLEADOS)
                .then(res => {
                    if(res.status === 200){
                        this.empleados = this.$store.state.personaladministrativo.empleados;
                    }
                    this.tableLoading =false;
                //console.log(this.etnias)
                })
                .catch(() => {
                    this.tableLoading = false;
                });

        },
        //Obtener tipo de empleado
        async obtenerTipoEmpleado(){
            //console.log("tipos")
            this.tipoPersonal=[];
            await this.$store
            .dispatch(OBTENER_TIPOS_PERSONAL,1)
            .then(res => {
                if(res.status === 200){
                    this.tipoPersonal = this.$store.state.tipopersonal.tipos    
                }
            })
            .catch(() => {});
        },
        //Obtener profeciones
        async obtenerProfeciones(){
            this.profeciones=[];
            await this.$store
            .dispatch(OBTENER_PROFECIONES,1)
            .then(res => {
                if(res.status === 200){
                    this.profeciones = this.$store.state.profecion.profeciones  
                }        
            })
            .catch(() => {});
        },
        obtenerDatosItem(Id){
            this.dialogLoaderVisible=true;
            this.datosEmpleado.id = Id;
            this.accion=2;
            this.modalTitle='Actualizar Empleado';
            this.btnRegistroText='Actualizar Empleado';

            this.$store
                .dispatch(OBTENER_EMPLEADO, Id)
                .then(() => {
                    this.datosEmpleado = this.$store.state.personaladministrativo.empleado;
                    this.datosEmpleado.estados_Id === 1 ? this.switchItemEstado = true : this.switchItemEstado = false;
                    if(this.datosEmpleado.fecha_Nacimiento != null) {
                        this.fechas.fechaNacimiento = moment(this.datosEmpleado.fecha_Nacimiento).format('YYYY-MM-DD');
                    }
                    this.dialog = true;
                    this.dialogLoaderVisible = false;
                })
                .catch(error => {
                    this.dialogLoaderVisible = false;
                    console.log(error)
                });
        },

        async registrarItem(){           
            this.btnRegistroLoading=true;
            this.switchItemEstado ? this.datosEmpleado.estados_Id = 1 : this.datosEmpleado.estados_Id = 2;
            if(this.accion===1){
                this.datosEmpleado.id = 0;
                await this.$store
                    .dispatch(REGISTRAR_EMPLEADO, this.datosEmpleado)
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
                .dispatch(ACTUALIZAR_EMPLEADO, this.datosEmpleado)
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
        this.obtenerTipoEmpleado();
        this.obtenerProfeciones();
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
                    text: "Tipo Empleado",
                    value: "tipo_personal.tipo"
                },
                {
                    text: "Profeción",
                    value: "profecion.profecion"
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
        fechaNacimiento:{
            get: function(){
                return this.fechas.fechaNacimiento
                ? moment(this.fechas.fechaNacimiento).format("DD-MM-YYYY")
                : null;
            },
            set: function(val){
                
                this.datosEmpleado.fecha_Nacimiento = moment(val, 'DD-MM-YYYY').format('YYYY-MM-DD');
                //console.log(this.datosEmpresa.fecha_Nacimiento )
                return val;
            }
        }, 
    },
    watch: {
        
        //Cambiar el formato de fecha de nacimiento del objeto datosEmpleado al momento de que fechas.fechaNacimiento cambie
        'fechas.fechaNacimiento': function(val){
            this.datosEmpleado.fecha_Nacimiento = val;
        },
        fechaNacimientoxx: {
          get: function (val) {
            //this.datosEmpleado.fecha_Nacimiento = moment(val).format("YYYY-MM-DD");
            return this.datosEmpleado.fecha_Nacimiento = moment(val, 'DD-MM-YYYY').format('YYYY-MM-DD')
           // console.log(this.datosEmpleado.fecha_Nacimiento)
          },
          set: function (newValue) {
               return this.datosEmpleado.fecha_Nacimiento = moment(newValue, 'DD-MM-YYYY').format('YYYY-MM-DD')
          }
        },
        menuFechaNacimiento (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
}
</script>
<style lang="">
    
</style>