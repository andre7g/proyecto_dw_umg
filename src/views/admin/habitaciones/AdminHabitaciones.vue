<template >
    <div style="margin: 10px;">
        <v-card :elevation="0">
            <v-card-title>
                <v-row class="col-md-12">
                    <v-col cols="12" sm="12" md="6" class="font-weight-black">
                        Habitaciones
                    </v-col>
                    <!--v-col cols="12" sm="12" md="6">
                        <v-btn
                            color=""
                            dark
                            class="mb-2 float-right bg-light-blue"
                            
                            @click="modalNueva"
                        >
                            Crear nuevo
                        </v-btn>
                    </v-col--> 
            
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
                        :items="habitaciones"
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
                            <td>{{ item.numero }}</td>
                            <td>{{ item.area.area }}</td>
                            <td>
                                <v-chip
                                        class="ma-2"
                                        :color="item.estados_Id === 3 ? 'teal' : 'red' "
                                        text-color="white"
                                        small
                                    >
                                        {{item.estados.estado}}
                                </v-chip>
                            </td>
                            <td>
                                <v-btn v-if="item.estados_Id === 3" class="ma-2" small tile outlined color="indigo" @click="entregarHabitacion(item.id)">
                                    <v-icon left>mdi-pencil</v-icon> Entrgar
                                </v-btn>
                                <v-btn v-if="item.estados_Id === 4" class="ma-2" small tile outlined color="indigo" @click="obtenerDatosItem(item.id)">
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
                        <SubHeader subHeaderTitle="Datos del Medicamento" />
                        <v-row>
                        <v-col  md="12" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosMedicamento.nombre"
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
                                v-model="datosMedicamento.descripcion"
                                label="Descripción"
                                :rules="[
                                    required(
                                        'Descripción'
                                    ),
                                    maxLength(
                                        'Descripción',
                                        45
                                    )
                                ]"
                            ></v-text-field>
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


    <!-- Inicio:: Dialog para mostrar los datos de la etnia-->
    <v-dialog
        v-model="dialogEntrgaHabitacion"
        max-width="900px" 
        persistent 
        transition="dialog-bottom-transition"
        
    >
        
        <v-card scrollable>
            <v-card-title>
                {{modalHabitacionTitle}}
                
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    :disabled="btnRegistroHabitacionLoading"
                    @click="dialogEntrgaHabitacion = false; resetForm()"
                    class="float-right"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="p-10">
            <v-form
                ref="form"
                v-on:submit.prevent="entregarHabitacion"
                v-model="validFormEntrega"
                >
                    <v-card flat>
                        <v-card-text class="p-4">
                        <SubHeader subHeaderTitle="Paciente" />
                    <v-row>
                        <v-col cols="12" md="12" sm="12" class="pt-1 pb-1">
                            <v-autocomplete
                                v-model="datosMedicamento.presentacion_Id"
                                :items="pacientes"
                                class="required"
                                dense
                                outlined
                                label="Seleccione el paciente"
                                item-text="mostrar"
                                item-value="id"
                                :rules="[
                                    selectRequired(
                                        'Paciente'
                                    )
                                ]"
                            
                            ></v-autocomplete>               
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
                                @click="dialogEntrgaHabitacion = false; resetForm()"
                                :disabled="btnRegistroHabitacionLoading"
                            >
                                Cancelar
                            </v-btn>
                            <!--:disabled="!validDocForm" type="submit"-->
                            <v-btn
                                color="primary"
                                class="mb-2 float-right"
                                type="submit"
                                :elevation="0" 
                                :disabled="!validFormEntrega" 
                                :loading="btnRegistroHabitacionLoading"                         
                            >
                                {{btnRegistroHabitacionText}}
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
import { OBTENER_HABITACIONES,REGISTRAR_PRODUCTO,OBTENER_PRODUCTO,ACTUALIZAR_PRODUCTO } from "@/services/store/habitacion.module";
import { OBTENER_PACIENTES } from "@/services/store/paciente.module";


import SnackAlert from '@/views/content/SnackAlert.vue';
import DialogLoader from "@/views/content/DialogLoader";
import SubHeader from "@/views/components/SubHeader"; 


export default {
    name: "AdminMedicamentos",
    components: {
        "dialog-loader": DialogLoader,
        SnackAlert,
        SubHeader,
    },
    data() {
        return {
            search:'',
            validForm:false,
            validFormEntrega: false,
            itemName : "Habitacion",
            dialog: false,
            dialogEntrgaHabitacion:false,
            modalTitle: 'Registrar Medicamento',
            modalHabitacionTitle:'Entrgar Habitación',
            btnRegistroHabitacionText:'Entregar',
            btnRegistroLoading: false,
            btnRegistroHabitacionLoading:false,
            idHabitacion:0,
            dialogLoaderVisible: false,
            dialogLoaderText: 'Obteniendo informacion....',
            btnRegistroText: 'Registrar Medicamento',
            accion: 1,
            habitaciones: [],
            pacientes:[],
            switchItemEstado: true,

            datosMedicamento: {
                id: 0,
                nombre: '',
                descripcion: '',
                estados_Id: 0,
                via_Administracion_Producto_Id: 0,
                marca_Id: 0,
                dosis_Id: 0,
                presentacion_Id: 0
            },
            tableLoading: false,
            ...validations
        } 
    }, 
    methods: {
        modalNueva(){
            this.accion =1;
            this.modalTitle='Registrar Medicamento';
            this.btnRegistroText='Registrar Medicamento';
            this.dialog=true;
        },

        resetForm(){
            
            this.datosMedicamento = {
                id: 0,
                nombre: '',
                descripcion: '',
                estados_Id: 0,
                via_Administracion_Producto_Id: 0,
                marca_Id: 0,
                dosis_Id: 0,
                presentacion_Id: 0
            };

            this.switchItemEstado = true;
        },
    

        //!Obtener el personal para la tabla
        obtnenerItems(){
            this.tableLoading = true;
            this.habitaciones=[];
            
            this.$store
                .dispatch(OBTENER_HABITACIONES)
                .then(res => {
                    if(res.status === 200){
                        this.habitaciones = this.$store.state.habitacion.habitaciones;
                    }
                    this.tableLoading =false;
                //console.log(this.etnias)
                })
                .catch(() => {
                    this.tableLoading = false;
                });

        },
        
        //Obtener obtenerPacientes
        async obtenerPacientes(){
            this.pacientes=[];
            await this.$store
            .dispatch(OBTENER_PACIENTES,1)
            .then(res => {
                if(res.status === 200){
                    this.pacientes = this.$store.state.paciente.pacientes  
                }        
            })
            .catch(() => {});
        },
        obtenerDatosItem(Id){
            this.dialogLoaderVisible=true;
            this.datosMedicamento.id = Id;
            this.accion=2;
            this.modalTitle='Actualizar Medicamento';
            this.btnRegistroText='Actualizar Medicamento';

            this.$store
                .dispatch(OBTENER_PRODUCTO, Id)
                .then(() => {
                    this.datosMedicamento = this.$store.state.producto.producto;
                    this.datosMedicamento.estados_Id === 1 ? this.switchItemEstado = true : this.switchItemEstado = false;

                    this.dialog = true;
                    this.dialogLoaderVisible = false;
                })
                .catch(error => {
                    this.dialogLoaderVisible = false;
                    console.log(error)
                });
        },
        entregarHabitacion(idHabitacion){
            this.idHabitacion = idHabitacion;
            this.dialogEntrgaHabitacion = true;

        },
        async registrarItem(){           
            this.btnRegistroLoading=true;
            this.switchItemEstado ? this.datosMedicamento.estados_Id = 1 : this.datosMedicamento.estados_Id = 2;
            if(this.accion===1){
                this.datosMedicamento.id = 0;
                await this.$store
                    .dispatch(REGISTRAR_PRODUCTO, this.datosMedicamento)
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
                .dispatch(ACTUALIZAR_PRODUCTO, this.datosMedicamento)
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
            { title: "Medicamento" }
        ]);
    },

    created(){
        this.obtnenerItems();
        this.obtenerPacientes();
    },

    
    computed: {
        headers() {
            return [
                {
                    text: "Número",
                    align: "start",
                    sortable: true,
                    value: "numero"
                },
                {
                    text: "Area",
                    value: "area.area",
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
    }
}
</script>
<style lang="">
    
</style>