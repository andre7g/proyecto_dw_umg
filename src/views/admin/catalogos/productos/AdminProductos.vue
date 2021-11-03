<template >
    <div style="margin: 10px;">
        <v-card :elevation="0">
            <v-card-title>
                <v-row class="col-md-12">
                    <v-col cols="12" sm="12" md="6" class="font-weight-black">
                        Administración de Medicamentos
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
                        :items="productos"
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
                            <td>{{ item.nombre }}</td>
                            <td>{{ item.descripcion }}</td>
                            <td>{{ item.via_Administracion_Producto.via }}</td>
                            <td>{{ item.marca.nombre }}</td>
                            <td>{{ item.dosis.nombre }}</td>
                            <td>{{ item.presentacion.nombre }}</td>
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
                v-on:submit.prevent="registrarMedicamento"
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
                                        2000
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" sm="12" class="pt-1 pb-1">
                            <v-autocomplete
                                v-model="datosMedicamento.via_Administracion_Producto_Id"
                                :items="vias"
                                class="required"
                                dense
                                outlined
                                label="Via de Administración"
                                item-text="via"
                                item-value="id"
                                :rules="[
                                    selectRequired(
                                        'Via de Administración'
                                    )
                                ]"
                            
                            ></v-autocomplete>               
                        </v-col>
                        <v-col cols="12" md="6" sm="12" class="pt-1 pb-1">
                            <v-autocomplete
                                v-model="datosMedicamento.marca_Id"
                                :items="marcas"
                                class="required"
                                dense
                                outlined
                                label="Marca"
                                item-text="nombre"
                                item-value="id"
                                :rules="[
                                    selectRequired(
                                        'Marca'
                                    )
                                ]"
                            
                            ></v-autocomplete>               
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" sm="12" class="pt-1 pb-1">
                            <v-autocomplete
                                v-model="datosMedicamento.dosis_Id"
                                :items="dosis"
                                class="required"
                                dense
                                outlined
                                label="Dosis"
                                item-text="nombre"
                                item-value="id"
                                :rules="[
                                    selectRequired(
                                        'Dosis'
                                    )
                                ]"
                            
                            ></v-autocomplete>               
                        </v-col>
                        <v-col cols="12" md="6" sm="12" class="pt-1 pb-1">
                            <v-autocomplete
                                v-model="datosMedicamento.presentacion_Id"
                                :items="presentaciones"
                                class="required"
                                dense
                                outlined
                                label="Presentación"
                                item-text="nombre"
                                item-value="id"
                                :rules="[
                                    selectRequired(
                                        'Presentación'
                                    )
                                ]"
                            
                            ></v-autocomplete>               
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" sm="12" class="pt-1 pb-1">
                            <v-autocomplete
                                v-model="datosMedicamento.funcion_medicamento_Id"
                                :items="funciones"
                                class="required"
                                dense
                                outlined
                                label="Uso"
                                item-text="nombre"
                                item-value="id"
                                :rules="[
                                    selectRequired(
                                        'Uso'
                                    )
                                ]"
                            
                            ></v-autocomplete>               
                        </v-col>
                        <v-col  md="6" sm="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosMedicamento.precio"
                                label="Precio"
                                :rules="[
                                    required(
                                        'Precio'
                                    ),
                                    maxNumber(
                                        'Precio',
                                        45
                                    ),
                                    onlyDecimal(
                                        'Precio'
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row v-if="accion===1">
                        <v-col cols="6">
                            <template>
                            <v-file-input
                                id="docFile"
                                v-model="docFile"
                                color="deep-purple accent-4"
                                counter
                                class="required"
                                dense
                                ref="docFile"
                                label="Seleccionar documento"
                                placeholder="Seleccione el archivo"
                                append-icon="mdi-paperclip"
                                prepend-icon=""
                                outlined
                                :rules="[fileRequired('Documento')]"
                                :show-size="1000"
                                accept=".jpg,.png"
                                @change="onFileChange"
                                
                                
                            >
                                <template v-slot:selection="{ index, text }">
                                <v-chip
                                    v-if="index < 2"
                                    color="deep-purple accent-4"
                                    dark
                                    label
                                    small
                                >
                                    {{ text }}
                                </v-chip>

                                <span
                                    v-else-if="index === 2"
                                    class="text-overline grey--text text--darken-3 mx-2"
                                >
                                    +{{ files.length - 2 }} archivo(s)
                                </span>
                                </template>
                            </v-file-input>
                            </template>
                        </v-col>
                    </v-row>
                    <v-row v-if="accion===2">
                        <v-col cols="6">
                            <template>
                            <v-file-input
                                id="docFile"
                                v-model="docFile"
                                color="deep-purple accent-4"
                                counter
                                class="required"
                                dense
                                ref="docFile"
                                label="Seleccionar documento"
                                placeholder="Seleccione el archivo"
                                append-icon="mdi-paperclip"
                                prepend-icon=""
                                outlined
                                :rules="[]"
                                :show-size="1000"
                                accept=".jpg,.png"
                                @change="onFileChange"
                                
                                
                            >
                                <template v-slot:selection="{ index, text }">
                                <v-chip
                                    v-if="index < 2"
                                    color="deep-purple accent-4"
                                    dark
                                    label
                                    small
                                >
                                    {{ text }}
                                </v-chip>

                                <span
                                    v-else-if="index === 2"
                                    class="text-overline grey--text text--darken-3 mx-2"
                                >
                                    +{{ files.length - 2 }} archivo(s)
                                </span>
                                </template>
                            </v-file-input>
                            </template>
                        </v-col>
                        <v-col md="6" sm="12" class="pt-1 pb-1">
                            <v-card
                            max-width="200"
                              class="mx-auto"
                              tile
                            >
                                <v-img :src="pathImagen"></v-img>
                            </v-card>

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
import { OBTENER_PRODUCTOS,REGISTRAR_PRODUCTO,OBTENER_PRODUCTO,ACTUALIZAR_PRODUCTO } from "@/services/store/producto.module";
import { OBTENER_VIAS_ADMINISTRACION } from "@/services/store/viaadministracion.module";
import { OBTENER_MARCAS } from "@/services/store/marca.module";
import { OBTENER_DOSIS } from "@/services/store/dosis.module";
import { OBTENER_PRESENTACIONES } from "@/services/store/presentacion.module";
import { OBTENER_FUNCIONES_MFEDICAMENTO } from "@/services/store/funcionmedicamento.module";

import { CARGAR_ARCHIVO } from "@/services/store/cargararchivo.module";

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
            validRolesForm: false,
            itemName : "Medicamento",
            dialog: false,
            modalTitle: 'Registrar Medicamento',
            btnRegistroLoading: false,

            dialogLoaderVisible: false,
            dialogLoaderText: 'Obteniendo informacion....',
            btnRegistroText: 'Registrar Medicamento',
            accion: 1,
            productos: [],
            vias:[],
            marcas:[],
            dosis:[],
            presentaciones:[],
            funciones:[],
            switchItemEstado: true,

            datosMedicamento: {
                id: 0,
                nombre: '',
                descripcion: '',
                estados_Id: 0,
                via_Administracion_Producto_Id: 0,
                marca_Id: 0,
                dosis_Id: 0,
                presentacion_Id: 0,
                path:'',
                precio:'',
                funcion_medicamento_Id:0
            },
            tableLoading: false,

            docFile: null,
            archivoCargado: false,
            pathImagen:'',
            ...validations,
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
            if(document.querySelector('#docFile').value !== ''){
                this.$refs.docFile.reset();
                document.querySelector('#docFile').value = '';
            }
            this.docFile = null;

            this.datosMedicamento = {
                id: 0,
                nombre: '',
                descripcion: '',
                estados_Id: 0,
                via_Administracion_Producto_Id: 0,
                marca_Id: 0,
                dosis_Id: 0,
                presentacion_Id: 0,
                path:'',
                precio:'',
                funcion_medicamento_Id:0
            };
            this.pathImagen='',
            this.switchItemEstado = true;
        },
    

        //!Obtener el personal para la tabla
        obtnenerItems(){
            this.tableLoading = true;
            this.productos=[];
            
            this.$store
                .dispatch(OBTENER_PRODUCTOS)
                .then(res => {
                    if(res.status === 200){
                        this.productos = this.$store.state.producto.productos;
                    }
                    this.tableLoading =false;
                //console.log(this.etnias)
                })
                .catch(() => {
                    this.tableLoading = false;
                });

        },
        //Obtener vias
        async obtenerVias(){
            this.vias=[];
            await this.$store
            .dispatch(OBTENER_VIAS_ADMINISTRACION,1)
            .then(res => {
                if(res.status === 200){
                    this.vias = this.$store.state.viaadministracion.vias  
                }        
            })
            .catch(() => {});
        },
        //Obtener marcas
        async obtenerMarcas(){
            this.marcas=[];
            await this.$store
            .dispatch(OBTENER_MARCAS,1)
            .then(res => {
                if(res.status === 200){
                    this.marcas = this.$store.state.marca.marcas  
                }        
            })
            .catch(() => {});
        },
        //Obtener dosis
        async obtenerDosis(){
            this.dosis=[];
            await this.$store
            .dispatch(OBTENER_DOSIS,1)
            .then(res => {
                if(res.status === 200){
                    this.dosis = this.$store.state.dosis.dosis  
                }        
            })
            .catch(() => {});
        },
        //Obtener presentaciones
        async obtenerPresentaciones(){
            this.presentaciones=[];
            await this.$store
            .dispatch(OBTENER_PRESENTACIONES,1)
            .then(res => {
                if(res.status === 200){
                    this.presentaciones = this.$store.state.presentacion.presentaciones  
                }        
            })
            .catch(() => {});
        },
        //Obtener funcion del medicamento
        async obtenerFuncionesMedicamento(){
            this.funciones=[];
            await this.$store
            .dispatch(OBTENER_FUNCIONES_MFEDICAMENTO,1)
            .then(res => {
                if(res.status === 200){
                    this.funciones = this.$store.state.funcionmedicamento.funcionesMedicamento  
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
                    this.pathImagen=`http://127.0.0.1:17157${this.datosMedicamento.path}`,
                    this.datosMedicamento.estados_Id === 1 ? this.switchItemEstado = true : this.switchItemEstado = false;
                    this.dialog = true;
                    this.dialogLoaderVisible = false;
                })
                .catch(error => {
                    this.dialogLoaderVisible = false;
                    console.log(error)
                });
        },
        //!Metodo que llama a cargar imagen (carga en el servidor) para luego almacenar el registro en el api
        registrarMedicamento(){
            if(this.docFile !== null){
                //console.log('si entra en el if');
                this.cargarImagen()
                .then(()=>{
                    //?Validar que el archivo fue cargado
                    if(this.archivoCargado){
                        this.registrarItem();
                    }
                })
                .catch(() => {
                    this.btnRegistroLoading=false;
                }); 

            }else{
                if(this.accion === 1){
                    delete this.datosProducto.pathDocumento;
                }
                //console.log('no entra en el if');
                this.registrarItem();

            }
        },
        //!Almacenar la imagen
        async cargarImagen(){
            const doc = this.docFile;
            console.log(doc);
            this.btnRegistroLoading = true;
                await this.$store
                    .dispatch(CARGAR_ARCHIVO, {file: doc, path: `\\documentos\\medicamentos\\`})
                    .then(res => {
                        //!Si se almacenó el archivo correctamente, cambiar el valor de arhivoCargado a true.
                        if(res.status===200){
                            
                            this.datosMedicamento.path = res.pathArchivo;
                            this.archivoCargado =true;
                            return true;
                        } else {
                            this.$refs.snackalert.SnackbarShow('warning', 'Alerta', `Ha ocurrido un error durante la carga de imagen.`);
                            this.archivoCargado =false;
                        }
                    })
                    .catch(err => {
                        this.$refs.snackalert.SnackbarShow('warning', 'Alerta', `Ha ocurrido un error, por favor ponte en contacto con un adminisrador del sistema. ${err}`);
                        this.btnRegistroLoading=false;
                        this.dialogLoaderVisible=false;
                        return false;
                    });            
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
        },
                //!Asignar el archivo
        onFileChange(e){
            //this.docFile = e
            if(e){
                console.log(e.type);
                //!?Validar que el tipo de archivo sea pdf
                //console.log(e.type);
                if (e.type != "image/jpeg" && e.type != "image/png"){
                    // Api call
                    this.$refs.snackalert.SnackbarShow('warning', 'Alerta', `El archivo que desea ingresar no es válido.`);
                    //console.log("no es un pdf..")
                    //this.$refs.file.reset();
                    document.querySelector('#docFile').value = '';
                    this.$refs.docFile.reset();
                    return false;
                }
                //?Validar que el tamaó del archivo no exceda los 5Mb
                if ((e.size/1024/1024) > 5){
                    this.$refs.snackalert.SnackbarShow('warning', 'Alerta', `El tamaño del archivo excede el límite permitido (5Mb)`);
                    // this.$refs.file.reset();
                    document.querySelector('#docFile').value = '';
                    this.$refs.docFile.reset();
                    return false;
                }
                this.docFile = e;
             
            }
            return false; // return false will not automatically upload
        },
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
        this.obtenerVias();
        this.obtenerMarcas();
        this.obtenerDosis();
        this.obtenerPresentaciones();
        this.obtenerFuncionesMedicamento();
    },

    
    computed: {
        headers() {
            return [
                {
                    text: "Id",
                    align: "start",
                    sortable: true,
                    value: "Id"
                },
                {
                    text: "Medicamento",
                    value: "nombre",
                },
                {
                    text: "Descripción",
                    value: "descripcion"
                },
                {
                    text: "Vía de Administración",
                    value: "via_Administracion_Producto.via"
                },
                {
                    text: "Marca",
                    value: "marca.nombre"
                },
                {
                    text: "Dosis",
                    value: "dosis.nombre"
                },
                {
                    text: "Presentación",
                    value: "presentacion.nombre"
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