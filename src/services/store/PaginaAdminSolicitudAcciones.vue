<template lang="">
    <div>
        <v-row>
        <v-col cols="6" sm="6" md="6"></v-col>
        <v-col cols="6" sm="6" md="6">
            <v-chip
                class="ma-4 float-right"
                :color="datosSolicitud.estados_SPS_Id === 1 ? 'teal' : datosSolicitud.estados_SPS_Id === 2 ? 'orange' : datosSolicitud.estados_SPS_Id === 3 ? 'amber' : datosSolicitud.estados_SPS_Id === 4 ? 'green' : 'red'"
                text-color="white"
                small
            >
                Estado: {{dotosS.estado}}
            </v-chip>
        </v-col>

        </v-row>

        <v-card>
            <v-card-text>
                <!-- Inicio:: Mostrar los datos del prospecto -->
                <component v-bind:is="actualVistaProspecto" :datos="datosProspecto"  :datosSolicitud="datosSolicitud" :datosPat="datosPat">
                <!-- component changes when vm.currentView changes! -->
                </component>
                <!-- Fin:: Mostrar los datos del prospecto -->
            </v-card-text>
        </v-card>
        <v-divider></v-divider>
            <!-- inicia v-tabs-->
            <v-card scrollable>
                <v-card-text class="p-10">
                    <v-tabs v-model="activeTab">
                    <v-tab key='acciones'>
                        <v-icon left>
                        mdi-file-document-edit-outline
                        </v-icon>
                        Acciones
                    </v-tab>
                    
                    <v-tab key='documentosSP'>
                        <v-icon left>
                        mdi-account-box-outline
                        </v-icon>
                        Documentos Solicitud Participación
                    </v-tab>
                    <!-- :disabled="accion===1" -->
                    <v-tab :disabled="datosSolicitud.estados_SPS_Id===1 || datosSolicitud.estados_SPS_Id===2 || datosSolicitud.estados_SPS_Id===3" key='documentosV'>
                        <v-icon left>
                        mdi-account-box-outline
                        </v-icon>
                        Documentos Vinculación
                    </v-tab>
                    <!--Inicia tab item Acciones-->
                    <!-- :disabled="accion===1" -->
                    <v-tab :disabled="datosSolicitud.estados_SPS_Id===1 || datosSolicitud.estados_SPS_Id===2 || datosSolicitud.estados_SPS_Id===3" key='asistencia'>
                        <v-icon left>
                        mdi-account-box-outline
                        </v-icon>
                        Planes Asistencia Técnica
                    </v-tab>
                    <!-- :disabled="accion===1" -->
                    <v-tab :disabled="datosSolicitud.estados_SPS_Id===1 || datosSolicitud.estados_SPS_Id===2 || datosSolicitud.estados_SPS_Id===3" key='due'>
                        <v-icon left>
                        mdi-account-box-outline
                        </v-icon>
                        Due Dilligence
                    </v-tab>
                                        <!-- :disabled="accion===1" -->
                    <v-tab :disabled="datosSolicitud.estados_SPS_Id===1 || datosSolicitud.estados_SPS_Id===2 || datosSolicitud.estados_SPS_Id===3" key='resumen'>
                        <v-icon left>
                        mdi-account-box-outline
                        </v-icon>
                        Resumen de Empresa
                    </v-tab>
                                                            <!-- :disabled="accion===1" -->
                    <v-tab :disabled="datosSolicitud.estados_SPS_Id===1 || datosSolicitud.estados_SPS_Id===2 || datosSolicitud.estados_SPS_Id===3" key='ads'>
                        <v-icon left>
                        mdi-account-box-outline
                        </v-icon>
                        ADS
                    </v-tab>
                    <!--Inicia tab item Acciones-->
                    <v-tab-item>
                         <v-card>
                            <v-card-title>
                                <v-row class="col-md-12">
                                    <v-col cols="12" sm="12" md="6">
                                        ACCIONES
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6">
                                    <v-btn
                                        color=""
                                        dark
                                        class="mb-2 float-right bg-light-blue"
                                        :disabled="datosSolicitud.estados_SPS_Id === 1 ? false: datosSolicitud.estados_SPS_Id === 4 ? false:true"
                                        @click="modalNueva"
                                    >
                                        Crear nueva acción
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
                                        :items="acciones"
                                        :search="search"
                                        item-key="Id"
                                        class="elevation-0"
                                        :loading="tableAccionesLoading"
                                        no-data-text="No hay datos para mostrar"
                
                                        :items-per-page="10"
                                        dense
                                        :footer-props="{
                                            showFirstLastPage: true,
                                            firstIcon: 'mdi-page-first',
                                            lastIcon: 'mdi-page-last',
                                            prevIcon: 'mdi-chevron-left',
                                            nextIcon: 'mdi-chevron-right',
                                            'items-per-page-text':'Registros por página',
                                            pageText: '{0}-{1} de {2}' 
                                        }"
                                    >
                                    <template v-slot:item="{ item }">
                                         <tr>
                                            <td>{{ item.id }}</td>
                                            <td>{{ item.fecha_Visita | formatDate }}</td>
                                            <td>{{ item.observaciones }}</td>
                                            <td>{{ item.medio_Verificacion }}</td>   
                                            <td>{{ item.fecha_Ingreso | formatDate }}</td>
                
                                            
                                            <td>
                                                 <v-chip
                                                        class="ma-2"
                                                        :color="item.estado_Id === 1 ? 'teal' : 'red'"
                                                        text-color="white"
                                                        small
                                                    >
                                                        {{item.estado}}
                                                </v-chip>
                                            </td>
                                            <td>
                                                <v-btn :disabled="datosSolicitud.estados_SPS_Id === 1 ? false: datosSolicitud.estados_SPS_Id === 4 ? false:true" class="ma-2" small tile outlined color="indigo" @click="obtenerDatosItem(item.id)">
                                                    <v-icon left>mdi-pencil</v-icon> Actualizar
                                                </v-btn>
                
                                                <v-btn :disabled="datosSolicitud.estados_SPS_Id === 1 ? false: datosSolicitud.estados_SPS_Id === 4 ? false:true" class="ma-2" small tile outlined color="indigo" @click="mostrarModalDocumentos(item.id,1)">
                                                    <v-icon left>mdi-file-document-outline</v-icon> Cargar Documentos
                                                    <v-badge
                                                        v-if="item.countDocs !== 0"
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        color="indigo"
                                                        :content="item.countDocs"
                                                    >
                                                    </v-badge>
                                                </v-btn>
                
                                                <v-btn :disabled="datosSolicitud.estados_SPS_Id === 1 ? false: datosSolicitud.estados_SPS_Id === 4 ? false:true" class="ma-2" small tile outlined color="indigo" @click="mostrarModalDocumentos(item.id,2)">
                                                    <v-icon left>mdi-file-document-outline</v-icon> Anexos
                                                    <v-badge
                                                        v-if="item.countDocsAnexo !== 0"
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        color="indigo"
                                                        :content="item.countDocsAnexo"
                                                    >
                                                    </v-badge>
                                                </v-btn>
                                                <v-btn :disabled="datosSolicitud.estados_SPS_Id === 1 ? false: datosSolicitud.estados_SPS_Id === 4 ? false:true" class="ma-2" small tile outlined color="indigo" @click="mostrarModalDocumentos(item.id,3)">
                                                    <v-icon left>mdi-file-document-outline</v-icon> Documentos Legales
                                                    <v-badge
                                                        v-if="item.countDocsLegales !== 0"
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        color="indigo"
                                                        :content="item.countDocsLegales"
                                                    >
                                                    </v-badge>
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </template>
                
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <!--End:: tab item acciones-->
                    <!--Inicia tab item docs sp-->
                    <v-tab-item>
                        <v-card>
                            <v-card-title>
                                <v-row class="col-md-12">
                                    <v-col cols="12" sm="12" md="6">
                                        Documentos Solicitud Participación 
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6">
                                    <v-btn
                                        color=""
                                        dark
                                        class="mb-2 float-right bg-light-blue"
                                        :disabled="datosSolicitud.estados_SPS_Id === 1 ? false: true"
                                        @click="mostrarModalDocumentosSolicitud(4)"
                                    >
                                        Agregar Documento
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
                                            v-model="searchDocParticipacion"
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
                                        :headers="headersParticipacion"
                                        :items="docsParticipacion"
                                        :search="searchDocParticipacion"
                                        item-key="Id"
                                        class="elevation-0"
                                        :loading="tableDocsParticipacionLoading"
                                        no-data-text="No hay documentos para mostrar"
                
                                        :items-per-page="10"
                                        dense
                                        :footer-props="{
                                            showFirstLastPage: true,
                                            firstIcon: 'mdi-page-first',
                                            lastIcon: 'mdi-page-last',
                                            prevIcon: 'mdi-chevron-left',
                                            nextIcon: 'mdi-chevron-right',
                                            'items-per-page-text':'Registros por página',
                                            pageText: '{0}-{1} de {2}' 
                                        }"
                                    >
                                    <template v-slot:item="{ item }">
                                         <tr>
                                            <td>{{ item.nombre }}</td> 
                                            <td>{{ item.tipo_Vinculacion_Solicitud }}</td> 
                                            <td>{{ item.fecha_Creacion | formatDate }}</td>
                
                                            <td>
                                                 <v-chip
                                                        class="ma-2"
                                                        :color="item.estado_Id === 3 ? 'teal' : 'amber'"
                                                        text-color="white"
                                                        small
                                                    >
                                                        {{item.estado}}
                                                </v-chip>
                                            </td>
                                            <td> 
                                                <v-btn
                                                    color="primary"
                                                    small
                                                    :href='`https://serviciopalladium.teinnsa.net${item.path}`' target="_blank">
                                                    Descargar
                                                </v-btn> 
                                                <v-btn class="ma-2" small tile outlined color="indigo" @click="mostrarComentarios(item.id)">
                                                    <v-icon left>mdi-clipboard-text-outline</v-icon>Observaciones
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </template>
                
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <!--End:: tab item docs sp-->
                    <!--Inicia tab item docs vinculacion-->
                    <v-tab-item>
                        <v-card>
                            <v-card-title>
                                <v-row class="col-md-12">
                                    <v-col cols="12" sm="12" md="6">
                                        Documentos Vinculación 
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6">
                                    <v-btn
                                        color=""
                                        dark
                                        class="mb-2 float-right bg-light-blue"
                                        :disabled="datosSolicitud.estados_SPS_Id === 1 ? false: datosSolicitud.estados_SPS_Id === 4 ? false:datosSolicitud.estados_SPS_Id === 11 ? false:true"
                                        @click="mostrarModalDocumentosSolicitud(5)"
                                    >
                                        Agregar Documento
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
                                            v-model="searchDocVinculacion"
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
                                        :headers="headersVinculacion"
                                        :items="docsVinculacion"
                                        :search="searchDocVinculacion"
                                        item-key="Id"
                                        class="elevation-0"
                                        :loading="tableDocsVinculacionLoading"
                                        no-data-text="No hay documentos para mostrar"

                                        :items-per-page="10"
                                        dense
                                        :footer-props="{
                                            showFirstLastPage: true,
                                            firstIcon: 'mdi-page-first',
                                            lastIcon: 'mdi-page-last',
                                            prevIcon: 'mdi-chevron-left',
                                            nextIcon: 'mdi-chevron-right',
                                            'items-per-page-text':'Registros por página',
                                            pageText: '{0}-{1} de {2}' 
                                        }"
                                    >
                                    <template v-slot:item="{ item }">
                                         <tr>
                                            <td>{{ item.nombre }}</td> 
                                            <td>{{ item.tipo_Vinculacion_Solicitud }}</td>
                                            <td>{{ item.fecha_Creacion | formatDate }}</td>

                                            <td>
                                                 <v-chip
                                                        class="ma-2"
                                                        :color="item.estado_Id === 3 ? 'teal' : item.estado_Id === 5 ? 'teal' :'amber'"
                                                        text-color="white"
                                                        small
                                                    >
                                                        {{item.estado}}
                                                </v-chip>
                                            </td>
                                            <td> 
                                                <v-btn
                                                    color="primary"
                                                    small
                                                    :href='`https://serviciopalladium.teinnsa.net${item.path}`' target="_blank">
                                                    Descargar
                                                </v-btn> 
                                                <v-btn class="ma-2" small tile outlined color="indigo" @click="mostrarComentarios(item.id)">
                                                    <v-icon left>mdi-clipboard-text-outline</v-icon>Observaciones
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </template>

                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <!--End:: tab item docs vinculacion-->
                     <!--Inicia tab item docs asistencia tecnica-->
                    <v-tab-item>
                        <v-card>
                            <v-card-title>
                                <v-row class="col-md-12">
                                    <v-col cols="12" sm="12" md="6">
                                        Documentos Planes Asistencia Técnica
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6">
                                    <v-btn
                                        color=""
                                        dark
                                        class="mb-2 float-right bg-light-blue"
                                        :disabled="datosSolicitud.estados_SPS_Id === 1 ? false: datosSolicitud.estados_SPS_Id === 4 ? false:true"
                                        @click="mostrarModalDocumentosSolicitud(6)"
                                    >
                                        Agregar Documento
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
                                            v-model="searchDocAsistencia"
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
                                        :headers="headersAsistencia"
                                        :items="docsAsistencia"
                                        :search="searchDocAsistencia"
                                        item-key="Id"
                                        class="elevation-0"
                                        :loading="tableDocsAsistenciaLoading"
                                        no-data-text="No hay documentos para mostrar"

                                        :items-per-page="10"
                                        dense
                                        :footer-props="{
                                            showFirstLastPage: true,
                                            firstIcon: 'mdi-page-first',
                                            lastIcon: 'mdi-page-last',
                                            prevIcon: 'mdi-chevron-left',
                                            nextIcon: 'mdi-chevron-right',
                                            'items-per-page-text':'Registros por página',
                                            pageText: '{0}-{1} de {2}' 
                                        }"
                                    >
                                    <template v-slot:item="{ item }">
                                         <tr>
                                            <td>{{ item.nombre }}</td> 
                                            <td>{{ item.fecha_Creacion | formatDate }}</td>

                                            <td>
                                                 <v-chip
                                                        class="ma-2"
                                                        :color="item.estado_Id === 3 ? 'teal' : 'amber'"
                                                        text-color="white"
                                                        small
                                                    >
                                                        {{item.estado}}
                                                </v-chip>
                                            </td>
                                            <td> 
                                                <v-btn
                                                    color="primary"
                                                    small
                                                    :href='`https://serviciopalladium.teinnsa.net${item.path}`' target="_blank">
                                                    Descargar
                                                </v-btn> 
                                                <v-btn class="ma-2" small tile outlined color="indigo" @click="mostrarComentarios(item.id)">
                                                    <v-icon left>mdi-clipboard-text-outline</v-icon>Observaciones
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </template>

                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <!--End:: tab item docs asistencia tecnica-->
                     <!--Inicia tab item docs Due Diligence-->
                    <v-tab-item>
                        <v-card>
                            <v-card-title>
                                <v-row class="col-md-12">
                                    <v-col cols="12" sm="12" md="6">
                                        Documentos Due Dilligence
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6">
                                    <v-btn
                                        color=""
                                        dark
                                        class="mb-2 float-right bg-light-blue"
                                        :disabled="datosSolicitud.estados_SPS_Id === 1 ? false: datosSolicitud.estados_SPS_Id === 4 ? false:true"
                                        @click="mostrarModalDocumentosSolicitud(9)"
                                    >
                                        Agregar Documento
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
                                            v-model="searchDocDueDiligence"
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
                                        :headers="headersAsistencia"
                                        :items="docsDueDiligence"
                                        :search="searchDocDueDiligence"
                                        item-key="Id"
                                        class="elevation-0"
                                        :loading="tableDocsDueDiligence"
                                        no-data-text="No hay documentos para mostrar"

                                        :items-per-page="10"
                                        dense
                                        :footer-props="{
                                            showFirstLastPage: true,
                                            firstIcon: 'mdi-page-first',
                                            lastIcon: 'mdi-page-last',
                                            prevIcon: 'mdi-chevron-left',
                                            nextIcon: 'mdi-chevron-right',
                                            'items-per-page-text':'Registros por página',
                                            pageText: '{0}-{1} de {2}' 
                                        }"
                                    >
                                    <template v-slot:item="{ item }">
                                         <tr>
                                            <td>{{ item.nombre }}</td> 
                                            <td>{{ item.fecha_Creacion | formatDate }}</td>

                                            <td>
                                                 <v-chip
                                                        class="ma-2"
                                                        :color="item.estado_Id === 3 ? 'teal' : 'amber'"
                                                        text-color="white"
                                                        small
                                                    >
                                                        {{item.estado}}
                                                </v-chip>
                                            </td>
                                            <td> 
                                                <v-btn
                                                    color="primary"
                                                    small
                                                    :href='`https://serviciopalladium.teinnsa.net${item.path}`' target="_blank">
                                                    Descargar
                                                </v-btn> 
                                                <v-btn class="ma-2" small tile outlined color="indigo" @click="mostrarComentarios(item.id)">
                                                    <v-icon left>mdi-clipboard-text-outline</v-icon>Observaciones
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </template>

                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                     <!--Inicia tab item docs asistencia tecnica-->
                    <v-tab-item>
                        <v-card>
                            <v-card-title>
                                <v-row class="col-md-12">
                                    <v-col cols="12" sm="12" md="6">
                                        Documentos Resumen de Empresa
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6">
                                    <v-btn
                                        color=""
                                        dark
                                        class="mb-2 float-right bg-light-blue"
                                        :disabled="datosSolicitud.estados_SPS_Id === 1 ? false: datosSolicitud.estados_SPS_Id === 4 ? false:true"
                                        @click="mostrarModalDocumentosSolicitud(10)"
                                    >
                                        Agregar Documento
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
                                            v-model="searchDocResumenEmpresa"
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
                                        :headers="headersAsistencia"
                                        :items="docsResumenEmpresa"
                                        :search="searchDocResumenEmpresa"
                                        item-key="Id"
                                        class="elevation-0"
                                        :loading="tableDocsResumenEmpresa"
                                        no-data-text="No hay documentos para mostrar"

                                        :items-per-page="10"
                                        dense
                                        :footer-props="{
                                            showFirstLastPage: true,
                                            firstIcon: 'mdi-page-first',
                                            lastIcon: 'mdi-page-last',
                                            prevIcon: 'mdi-chevron-left',
                                            nextIcon: 'mdi-chevron-right',
                                            'items-per-page-text':'Registros por página',
                                            pageText: '{0}-{1} de {2}' 
                                        }"
                                    >
                                    <template v-slot:item="{ item }">
                                         <tr>
                                            <td>{{ item.nombre }}</td> 
                                            <td>{{ item.fecha_Creacion | formatDate }}</td>

                                            <td>
                                                 <v-chip
                                                        class="ma-2"
                                                        :color="item.estado_Id === 3 ? 'teal' : 'amber'"
                                                        text-color="white"
                                                        small
                                                    >
                                                        {{item.estado}}
                                                </v-chip>
                                            </td>
                                            <td> 
                                                <v-btn
                                                    color="primary"
                                                    small
                                                    :href='`https://serviciopalladium.teinnsa.net${item.path}`' target="_blank">
                                                    Descargar
                                                </v-btn> 
                                                <v-btn class="ma-2" small tile outlined color="indigo" @click="mostrarComentarios(item.id)">
                                                    <v-icon left>mdi-clipboard-text-outline</v-icon>Observaciones
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </template>

                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card>
                            <v-card-title>
                                <v-row class="col-md-12">
                                    <v-col cols="12" sm="12" md="6">
                                        Documentos ADS
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6">
                                    <v-btn
                                        color=""
                                        dark
                                        class="mb-2 float-right bg-light-blue"
                                        :disabled="datosSolicitud.estados_SPS_Id === 1 ? false: datosSolicitud.estados_SPS_Id === 4 ? false:true"
                                        @click="mostrarModalDocumentosSolicitud(11)"
                                    >
                                        Agregar Documento
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
                                            v-model="searchDocADS"
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
                                        :headers="headersAsistencia"
                                        :items="docsAds"
                                        :search="searchDocADS"
                                        item-key="Id"
                                        class="elevation-0"
                                        :loading="tableAdsLoading"
                                        no-data-text="No hay documentos para mostrar"

                                        :items-per-page="10"
                                        dense
                                        :footer-props="{
                                            showFirstLastPage: true,
                                            firstIcon: 'mdi-page-first',
                                            lastIcon: 'mdi-page-last',
                                            prevIcon: 'mdi-chevron-left',
                                            nextIcon: 'mdi-chevron-right',
                                            'items-per-page-text':'Registros por página',
                                            pageText: '{0}-{1} de {2}' 
                                        }"
                                    >
                                    <template v-slot:item="{ item }">
                                         <tr>
                                            <td>{{ item.nombre }}</td> 
                                            <td>{{ item.fecha_Creacion | formatDate }}</td>

                                            <td>
                                                 <v-chip
                                                        class="ma-2"
                                                        :color="item.estado_Id === 3 ? 'teal' : 'amber'"
                                                        text-color="white"
                                                        small
                                                    >
                                                        {{item.estado}}
                                                </v-chip>
                                            </td>
                                            <td> 
                                                <v-btn
                                                    color="primary"
                                                    small
                                                    :href='`https://serviciopalladium.teinnsa.net${item.path}`' target="_blank">
                                                    Descargar
                                                </v-btn> 
                                                <v-btn class="ma-2" small tile outlined color="indigo" @click="mostrarComentarios(item.id)">
                                                    <v-icon left>mdi-clipboard-text-outline</v-icon>Observaciones
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </template>

                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    </v-tabs>
                <!--End:: v-tabs-->                       
                </v-card-text>
            <div style="flex: 1 1 auto;"></div>
        </v-card>
<!-- finaliza tabs-->
































        <!-- Inicio:: Dialog para mostrar los datos de la etnia-->
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
                    @click="dialog = false;resetForm()"
                    class="float-right"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-form
                ref="form"
                v-on:submit.prevent="registrarAccion"
                v-model="validForm"
                >
                <v-card-text>
                <v-row>
                    <v-col cols="12" md="12" sm="12" class="pt-1 pb-1">
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
                                        :rules="[required(
                                            'Fecha de la visita'
                                        ),]"
                                        v-model="fechaNacimiento"
                                        label="Fecha de la visita"
                                        append-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        hint="DD-MM-YYYY"
                                        class=""
                                        clearable
                                    ></v-text-field>
                                </template>
                                <v-date-picker 
                                    v-model="fechas.fecha_Visita" 
                                    @change="menuFechaNacimiento = false" 
                                    :active-picker.sync="activePicker"
                                    locale="es"
                                    :max="maxDate()"
                                    min="1940-01-01"
                                    
                                ></v-date-picker>
                            </v-menu>
                                
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col  md="12" sm="12" class="pt-1 pb-1">
                            <v-textarea
                            
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosAccion.observaciones"
                                label="Observaciones"
                                :rules="[
                                    required(
                                        'Observaciones'
                                    ),
                                    maxLength(
                                        'Observaciones',
                                        500
                                    )
                                ]"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12" sm="12">    
                        <v-autocomplete
                                        v-model="datosAccion.medio_Verificacion_Id"
                                        :items="mediosVerificacion"
                                        :search-input.sync="searchddl"
                                        class="required"
                                        dense
                                        outlined
                                        label="Medio de Verificación"
                                        item-text="nombre"
                                        item-value="id"
                                        :rules="[
                                            selectRequired(
                                                'Medio de Verificación'
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
                <v-card-actions>
                    <v-spacer></v-spacer>
                            <v-btn
                                color="grey lighten-5"
                                elevation="0"
                                class="mb-2 float-right grey lighten-5"
                                @click="dialog = false;resetForm()"
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
            </v-form>
        </v-card>
    </v-dialog>
    <!-- Fin:: Dialog para mostrar los datos de la etnia-->
<!--Inicio:: Dialgo para almacenamiento de documentos-->
    <v-dialog
        v-model="dialogDoc"
        max-width="900px" 
        persistent 
        transition="dialog-bottom-transition"
        
    >
        
        <v-card scrollable >
            <v-card-title>
                {{modalTitleDoc}}
                
                <v-spacer></v-spacer>
                <v-btn
                    icon

                    @click="dialogDoc = false,resetFormDoc()"
                    class="float-right"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-form
                    ref="docForm"
                    v-model="validDocForm"
                    v-on:submit.prevent="registrarDocumento"
                    >
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <template>
                            <v-file-input
                                id="docFile"
                                v-model="docFile"
                                color="deep-purple accent-4"
                                counter
                                dense
                                ref="docFile"
                                label="Seleccionar documento"
                                placeholder="Seleccione el archivo"
                                append-icon="mdi-paperclip"
                                prepend-icon=""
                                outlined
                                :rules="[fileRequired('Documento')]"
                                :show-size="1000"
                                accept=".pdf"
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
                    <v-row>
                        <v-col cols="12" md="12" sm="12" class="pt-1 pb-1">
                                    <v-text-field
                                        outlined
                                        autocomplete="off"
                                        class="required"
                                        dense
                                        
                                        v-model="datosDocumento.nombre"
                                        label="Descripción Acción"
                                        :rules="[
                                           required(
                                                'Descripción Acción'
                                            ),
                                            maxLength(
                                                'Descripción Acción',
                                                50
                                            ),
                                            minLength(
                                                'Descripción Acción',
                                                3
                                            )
                                        ]"
                                        required
                                    ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn
                            color="grey lighten-5"
                            elevation="0"
                            :disabled="btnRegistroDocLoading"
                            class="mb-2 float-right grey lighten-5"
                            @click="dialogDoc = false,resetFormDoc()"
                        >
                            Cancelar
                        </v-btn>
                        <!--:disabled="!validDocForm" type="submit"-->
                        <v-btn
                            color="primary"
                            class="mb-2 float-right"
                            type="submit"
                            :elevation="0"
                            :loading="btnRegistroDocLoading"
                            :disabled="!validDocForm"
                            
                        >
                            Guardar documento
                        </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>

        <v-card>
            <v-card-text>
                <v-container>
                    <SubHeader :subHeaderTitle="`Documentos registrados`" />
                    <v-data-table
                        :headers="documentosHeaders"
                        :items="documentos"
                        :items-per-page="10"
                        :loading="tableDocLoading"
                        class="elevation-1"
                        no-data-text="No hay documentos registrados..."
                    >
                        <template v-slot:item="{ item }">
                            <tr>
                                
                                <td>{{ item.nombre }}</td>
                                <td>{{ item.fecha_Ingreso | formatDate }}</td>
                                <td> <v-btn
                                        color="primary"
                                        small
                                        :href='`https://serviciopalladium.teinnsa.net${item.path}`' target="_blank">
                                        Descargar
                                    </v-btn> 
                                </td>
                            </tr>
                        </template>                    
                    </v-data-table>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
    
    
    <!--Fin:: Dialgo para almacenamiento de documentos-->

    <!--Inicio:: Dialgo para almacenamiento de documentos-->
    <v-dialog
        v-model="dialogDocSolicitud"
        max-width="900px" 
        persistent 
        transition="dialog-bottom-transition"
        
    >
        
        <v-card scrollable >
            <v-card-title>
                {{modalTitleDoc}}
                
                <v-spacer></v-spacer>
                <v-btn
                    icon

                    @click="dialogDocSolicitud = false,resetFormDocSolicitud()"
                    class="float-right"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-form
                    ref="docSolicitudForm"
                    v-model="validDocSolicitudForm"
                    v-on:submit.prevent="registrarDocumentoSolicitud"
                    >
            <v-card-text>
                <v-container>
                <v-row v-if="datosSolicitud.estados_SPS_Id === 11">
                <v-checkbox v-model="selectedCheck" label="Documento Final"></v-checkbox>
                </v-row>
                    <v-row>
                        <v-col cols="12">
                            <template>
                            <v-file-input
                                id="docFile"
                                v-model="docFile"
                                color="deep-purple accent-4"
                                counter
                                dense
                                ref="docFile"
                                label="Seleccionar documento"
                                placeholder="Seleccione el archivo"
                                append-icon="mdi-paperclip"
                                prepend-icon=""
                                outlined
                                :rules="[fileRequired('Documento')]"
                                :show-size="1000"
                                accept=".pdf"
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
                    <v-row>
                        <v-col cols="12" md="12" sm="12" class="pt-1 pb-1">
                                    <v-text-field
                                        outlined
                                        autocomplete="off"
                                        class="required"
                                        dense
                                        
                                        v-model="datosDocumentoSolicitud.nombre"
                                        label="Descripción del archivo"
                                        :rules="[
                                           required(
                                                'Descripción del archivo'
                                            ),
                                            maxLength(
                                                'Descripción del archivo',
                                                50
                                            ),
                                            minLength(
                                                'Descripción del archivo',
                                                3
                                            )
                                        ]"
                                        required
                                    ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row v-if="verTipo===true">
                        <v-col cols="12" md="12" sm="12" xs="12" class="pt-1 pb-1">
                            <v-autocomplete
                                        v-model="datosDocumentoSolicitud.tipo_Vinculacion_Solicitud_Id"
                                        :items="tipos"
                                        class="required"
                                        dense
                                        outlined
                                        :loading="selectLoader"
                                        label="Tipo de Documento"
                                        item-text="nombre"
                                        item-value="id"
                                        :rules="[
                                            selectRequired(
                                                'Tipo de Documento'
                                            )
                                        ]"
                                        @change="obtenerTipoDocumentoSolicitud"
                                        
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row v-if="datosSolicitud.estados_SPS_Id === 4">
                        <v-col cols="12" md="12" sm="12" xs="12" class="pt-1 pb-1">
                            <h4>{{mensajeTipoDoc}}</h4>
                        </v-col>
                    </v-row>
                        
                </v-container>
            </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn
                            color="grey lighten-5"
                            elevation="0"
                            :disabled="btnRegistroDocLoadingSol"
                            class="mb-2 float-right grey lighten-5"
                            @click="dialogDocSolicitud = false,resetFormDocSolicitud()"
                        >
                            Cancelar
                        </v-btn>
                        <!--:disabled="!validDocForm" type="submit"-->
                        <v-btn
                            color="primary"
                            class="mb-2 float-right"
                            type="submit"
                            :elevation="0"
                            :loading="btnRegistroDocLoadingSol"
                            :disabled="!validDocSolicitudForm"
                            
                        >
                            Guardar documento
                        </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
      <!--Fin:: Dialgo para almacenamiento de documentos-->
    <!--begin::Sticky Toolbar-->
		<ul class="sticky-toolbar pl-2 pr-2">
			<!--begin::Item-->
			<li class="nav-item" id="kt_demo_panel_toggle" data-toggle="tooltip" title="Enviar para Autorización" >

                    <v-btn
                        dark
                        class="btn btn-sm btn-icon  btn-icon-success btn-hover-success"                        
                        @click="mostrarModalEstado()"
                    >
                        <i class="far fa-paper-plane icon-2x"></i>
                    </v-btn>
			</li>
			<!--end::Item-->
		</ul>
		<!--end::Sticky Toolbar-->
        <!-- Inicio:: Dialog para enviar-->
    <v-dialog
        v-model="dialogConfirmarEstado"
        max-width="400px" 
        persistent 
        transition="dialog-bottom-transition"
        
    >
        
        <v-card scrollable>
            <v-card-title>
                Enviar Solicitud
                
                <v-spacer></v-spacer>
                <v-btn
                    icon

                    @click="dialogConfirmarEstado = false"
                    class="float-right"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container>
                    <h3>{{dialogConfirmarEstadoText}}</h3>
                </v-container>
            </v-card-text>
            <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn
                            color="grey lighten-5"
                            elevation="0"
                            :disabled="btnConfirmarEstadoLoading"
                            class="mb-2 float-right grey lighten-5"
                            @click="dialogConfirmarEstado = false"
                        >
                            Cancelar
                        </v-btn>
                        <!--:disabled="!validDocForm" type="submit"-->
                        <v-btn
                            color="primary"
                            class="mb-2 float-right"
                            type="submit"
                            :elevation="0"
                            :disabled="btnEnviar"
                            :loading="btnConfirmarEstadoLoading" 
                            @click="enviar()"                          
                        >
                            {{btnConfirmarEstadoText}}
                        </v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
    <!--Fin:: Dialgo para enviar-->


    <!--Inicio:: Dialgo para comentarios por documentos-->
    <v-dialog
        v-model="dialogComentarioDoc"
        max-width="900px" 
        persistent 
        transition="dialog-bottom-transition"
        
    >
        
        <!--v-card scrollable >
            <v-card-title>
                Observaciones del Documento
                
                <v-spacer></v-spacer>
                <v-btn
                    icon

                    @click="dialogComentarioDoc = false,comentarioDoc.comentario=''"
                    class="float-right"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-form
                    ref="comentariosDocForm"
                    v-model="validComentariosDocForm"
                    v-on:submit.prevent="registrarComentario"
                    -->
            <!--v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12" sm="12" class="pt-1 pb-1">
                       <v-textarea
                            outlined
                            autocomplete="off"
                            
                            dense
                            v-model="comentarioDoc.comentario"
                            label="Comentario"
                            :rules="[
                                required(
                                    'Comentario'
                                ),
                                maxLength(
                                    'Comentario',
                                    500
                                ),
                            ]"                                     
                           ></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text-->
                <!--v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn
                            color="grey lighten-5"
                            elevation="0"
                            :disabled="btnRegistroComentarioDocLoading"
                            class="mb-2 float-right grey lighten-5"
                            @click="dialogComentarioDoc = false,comentarioDoc.comentario=''"
                        >
                            Cancelar
                        </v-btn>
                        <v-btn
                            color="primary"
                            class="mb-2 float-right"
                            type="submit"
                            :elevation="0"
                            :loading="btnRegistroComentarioDocLoading"
                            :disabled="!validComentariosDocForm"
                            
                        >
                            Guardar documento
                        </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-->

        <v-card>
                <v-card-title>
                Observaciones del Documento
                
                <v-spacer></v-spacer>
                <v-btn
                    icon

                    @click="dialogComentarioDoc = false"
                    class="float-right"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container>
                    <SubHeader :subHeaderTitle="`Observaciones registradas`" />
                    <v-data-table
                        :headers="comentariosHeaders"
                        :items="comentarios"
                        :items-per-page="10"
                        :loading="tableComentarioDocLoading"
                        class="elevation-1"
                        no-data-text="No hay observaciones registrados..."
                    >
                        <template v-slot:item="{ item }">
                            <tr>
                                <td>{{ item.comentario }}</td>
                                <td>{{ item.fecha_Ingreso | formatDate }}</td>
                                <td>{{ item.estadoSPS }}</td>
                            </tr>
                        </template>                    
                    </v-data-table>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
    
    
    <!--Fin:: Dialgo para almacenamiento de documentos-->


        <dialog-loader
            :dialogVisible="dialogLoaderVisible"
            :text="dialogLoaderText"
        ></dialog-loader>

    <!--Inicio:: Snack alert-->
    <SnackAlert ref="snackalert"></SnackAlert>
    <!-- Fin:: Snack alert-->
    </div>
</template>
<script>
import moment from "moment";
import Vue from 'vue';
import validations from "@/core/untils/validations.js";
import DialogLoader from "@/view/content/DialogLoader";
import SnackAlert from '@/view/content/SnackAlert.vue';
import SubHeader from "@/view/components/subheader/SubHeader";
import DatosProspectoInstitucion from "@/view/components/prospectos/solicitud/DatosEntidadEstado";
import DatosProspectoEmpresa from "@/view/components/prospectos/solicitud/DatosEmpresa";
import DatosProspectoSocioExtranjero from "@/view/components/prospectos/solicitud/DatosSocioExtranjero";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { OBTENER_SOLICITUD_SPS,ACTUALIZAR_SOLICITUD_SPS } from "@/core/services/store/solicitudparticipacionsps.module";
import { REGISTRAR_HISTORIAL_AUTORIZACION } from "@/core/services/store/historialautorizacionsps.module";
import { OBTENER_EMPRESA_DESCRIPCIONES } from "@/core/services/store/empresa.module";
import { OBTENER_SOCIO_EXTRANJERO_DESCRIPCIONES } from "@/core/services/store/socioextranjero.module";
import { OBTENER_INSTITUCION_DESCRIPCIONES } from "@/core/services/store/institucion.module";
import { OBTENER_ACCION,OBTENER_HISTORIAL_ACCIONES_BY_SOLICITUD,REGISTRAR_ACCION,ACTUALIZAR_ACCION } from "@/core/services/store/historialacciones.module";
import { OBTENER_MEDIOS } from "@/core/services/store/medioverificacion.module";
import { OBTENER_DOCUMENTOS_POR_ACCION,REGISTRAR_DOCUMENTO } from "@/core/services/store/documentosps.module";
import { OBTENER_HISTORIAL_DOCUMENTOS_POR_SOLICITUD,OBTENER_HISTORIAL_DOCUMENTOS_SIN_TIPO_POR_SOLICITUD,REGISTRAR_HISTORIAL_DOCUMENTO } from "@/core/services/store/historialdocumentosps.module";
import { CARGAR_ARCHIVO } from "@/core/services/store/cargararchivo.module";
import { OBTENER_ESTADO_SOLICITUD_SPS } from "@/core/services/store/estadosolicitud.module";
import { OBTENER_TIPOS_DOCUMENTO_VINCULACIONSOLICITUD_SOLICITUD,OBTENER_TIPO_DOCUMENTO_VINCULACIONSOLICITUD } from "@/core/services/store/tipovinculacionsolicitud.module";
import { ACTUALIZAR_ESTADO_ITEM,ACTIVAR_SOCIO } from "@/core/services/store/estadoitem.module";
import { OBTENER_OBSERVACIONES_BY_DOCUMENTO } from "@/core/services/store/observaciondoc.module";

moment.locale('es');
Vue.filter("formatDate", function(value) {
    if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
    }
});
export default {
    components: {
        "dialog-loader": DialogLoader,
        DatosProspectoInstitucion,
        DatosProspectoEmpresa,
        DatosProspectoSocioExtranjero,
        SnackAlert,
        SubHeader,
    },
    data(){
        return{
            accion:1, //1 registrar, 2 actualizar
            activeTab:'acciones',
            dialogConfirmarEstado: false,
            parametros:'',
            searchddl:'',
            actualVistaProspecto: '',
            dialogConfirmarEstadoText:'',
            modalTitle: 'Registrar Acción',
            modalTitleDoc:'',
            btnRegistroText: 'Registrar Acción',
            btnConfirmarEstadoText:'',
            btnRegistroDocLoading:false,
            btnRegistroDocLoadingSol:false,
            btnConfirmarEstadoLoading:false,
            dialogDoc:false,
            dialogDocSolicitud:false,
            search: '',
            searchDocParticipacion:'',
            searchDocVinculacion:'',
            searchDocAsistencia:'',
            searchDocDueDiligence:'',
            searchDocResumenEmpresa:'',
            idSolicitud:0,
            dialogLoaderVisible: false,
            dialogLoaderText:'',
            dialog: false,
            menuFechaNacimiento: false,
            validForm:false,
            tableAccionesLoading:false,
            tableDocsParticipacionLoading:false,
            tableDocsVinculacionLoading:false,
            tableDocsAsistenciaLoading:false,
            tableDocsDueDiligence:false,
            tableDocLoading: false,
            tableDocsResumenEmpresa:false,
            btnRegistroLoading: false,
            fechas: {
                fecha_Visita: ''
            },
            dotosS:{
                idSolicitud:0,
                nombre:''
            },
            activePicker: null,
            datosSolicitud: {
                id:0,
                fecha_Ingreso: '2021-07-23',
                usuario_Ingreso: 'admin',
                instituciones_Estado_Id: 0,
                empresas_Id: 0,
                socio_Extranjero_Id: 0,
                estados_Id: 1,
                estados_SPS_Id: 0
            },   
            datosAccion: {
                id:0,
                fecha_Visita: '',
                observaciones: '',
                fecha_Ingreso: '2021-07-23',
                usuario_Ingreso: 'admin',
                medio_Verificacion_Id: 0,
                solicitud_Participacion_Id: 0,
                estados_Id: 1
            },
            datosDocumento: {
                id:0,
                nombre: '',
                path: '',
                fecha_Ingreso: "2021-08-31",
                usuario_Ingreso: "admin",
                historial_Acciones_Id: 0,
                icono: 'pdf',
                fecha_Documento: "2021-08-31",
                estados_Id: 1,
                tipo_Documento_HA_Id: 0
            },
            datosDocumentoSolicitud: {
                id:0,
                nombre:'',
                path:'',
                fecha_Creacion:"2021-08-31",
                usuario_Creacion:'admin',
                tipo_Documento_HA_Id:0,
                estados_Id:3,
                solicitud_Participacion_Id:0,
                tipo_Vinculacion_Solicitud_Id:0
            },
            historialAutorizacion:{
                id:0,
                fecha_Ingreso:'2021-07-23',
                usuario_Ingreso:'admin',
                solicitud_Participacion_Id:0,
                estados_SPS_Id_Actual:0,
                estados_SPS_Id_Anterior:0,
                estados_Id:1,
                usuario_Recibe:'EncargadoComponente'
            },
            switchItemEstado: true,
            datosProspecto: {},
            datosPat: {
                id:0,
                fechaCreacion:'',
                usuarioCreacion:'',
                solicitud_Participacion_SPS_Id:0,
                componentes_Id:0,
                componente:'',
                descripcion_Componente:'',
                estados_Id:0,
                estado:0
            },
            acciones:[],
            docsParticipacion:[],
            docsVinculacion:[],
            docsAsistencia:[],
            mediosVerificacion:[],
            docsDueDiligence:[],
            docsResumenEmpresa:[],
            tipos:[],
            tipoDocumentoMensaje:false,
            ...validations,
            validDocForm:false,
            validDocSolicitudForm:false,
            docFile: [],
            documentos:[],
            accion_Id:0,
            tipoDocumento:0,
            archivoCargado: false,
            btnEnviar: false,
            //btnAgregar: false,
            listaParticipacion: false,
            listaVinculacion:false,
            listaPlanesAsistenciaTecnica:false,
            listaDueDiligence:false,
            listaResumenEmpresa:false,
            listaAcciones:false,
            selectedCheck:true,
            verTipo:true,
            tableComentarioDocLoading:false,
            comentarios:[],
           // btnRegistroComentarioDocLoading:false,
            dialogComentarioDoc:false,
            mostralModalDocSolicitud:true,
            selectLoader:false,
            necesitaAutorizacion:'',
            //validComentariosDocForm:false,
            mensajeTipoDoc:'',

            docsAcciones:false,
            noDocs:0,
            mensaje:'',

            searchDocADS:'',
            docsAds:[],
            tableAdsLoading:false,
            listaAds:false
        }
    },
    mounted() {
        //Definir el nombre en el breadcrumb
        this.$store.dispatch(SET_BREADCRUMB, [
            { title: "Administración", route: "/dashboard" },
            { title: "Buscar Prospecto", route: "/admin/solicitudesParticipacion" },
            { title: "Solicitud Participación" }
        ]);
    },
    created(){
        this.cargarSolicitud();
        this.obtenerMediosVerificacion();
    },
    
    methods:{
        maxDate() {
            const date = new Date();
            date.setFullYear(date.getFullYear());
            return date.toISOString().substr(0, 10);
        },
        minDate() {
            const date = new Date();
            date.setFullYear(date.getFullYear() - 60);
            return date.toISOString().substr(0, 10);
        },
        cargarSolicitud(){
            this.dialogLoaderVisible = true;
            this.dialogLoaderText = 'Cargando solicitud...';
            this.parametros = this.$route.params;
            if(this.parametros.id){
                this.idSolicitud = this.parametros.id
                this.obtenerDatosSolicitud(this.idSolicitud);
                this.dialogLoaderVisible = false;
            }
        },
        mostrarComentarios(documento_Id){
            //this.comentarioDoc.historial_Doc_SPS_Id = documento_Id;
            //this.comentarioDoc.estados_SPS_Id = this.datosSolicitud.estados_SPS_Id;
            this.obtenerComentarios(documento_Id);
            this.dialogComentarioDoc=true;
        },
        async obtenerTipoDocumentoSolicitud(){
            let tipo_Id = this.datosDocumentoSolicitud.tipo_Vinculacion_Solicitud_Id;
            //console.log(tipo_Id);
            await this.obtenerTipoVinculacionSolicitud(tipo_Id);
            if(this.necesitaAutorizacion === 'S'){
                this.mensajeTipoDoc='El tipo de documento necesita aprobación de AID';
            }else{
                this.mensajeTipoDoc='El tipo de documento no necesita aprobación de AID';
            }
        },
        async obtenerTipoVinculacionSolicitud(tipo_Id){  
            this.selectLoader=true;    
            await this.$store
            .dispatch(OBTENER_TIPO_DOCUMENTO_VINCULACIONSOLICITUD,tipo_Id)
            .then(res => {
                 if(res.status===200){
                    this.necesitaAutorizacion = this.$store.state.tipovinculacionsolicitud.tipoDocumento.aprobacion_AID;
                    //console.log(this.necesitaAutorizacion);
                    this.selectLoader=false;
                 }
                 this.selectLoader=false;
            })
            .catch(() => {
                 this.selectLoader=false;
            });
        },
        async obtenerComentarios(documento_Id){  
            this.tableComentarioDocLoading=true;
            this.comentarios=[];      
            await this.$store
            .dispatch(OBTENER_OBSERVACIONES_BY_DOCUMENTO,documento_Id )
            .then(res => {
                 if(res.status===200){
                    this.comentarios = this.$store.state.observaciondoc.observaciones;
                    this.tableComentarioDocLoading=false;
                 }
                 this.tableComentarioDocLoading=false;
            })
            .catch(() => {
                 this.tableComentarioDocLoading=false;
            });
        },
        mostrarModalEstado(){
            if(this.datosSolicitud.estados_SPS_Id === 1){
                if(this.listaParticipacion === true){
                        this.btnEnviar = false;
                        this.dialogConfirmarEstadoText = '¿Está seguro de enviar la solicutud?';
                }else{

                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de solicitud participación';
                        this.btnEnviar = true;

                }
            }else if(this.datosSolicitud.estados_SPS_Id === 4){
                if(this.listaVinculacion === true && this.listaPlanesAsistenciaTecnica === true && this.listaDueDiligence === true && this.listaResumenEmpresa === true && this.listaAds === true){
                    this.btnEnviar = false;
                    this.dialogConfirmarEstadoText = '¿Está seguro de enviar la solicutud?';
                }else{
                    if(this.listaVinculacion === false){
                        if(this.listaPlanesAsistenciaTecnica === false){
                            if(this.listaDueDiligence === false){
                                if(this.listaResumenEmpresa === false){
                                    if(this.listaAds === false){
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de vinculación, planes de asistencia tecnica, due dilligence, resumen de empresa y ads.';
                                        this.btnEnviar = true;
                                    }else{
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de vinculación, planes de asistencia tecnica, due dilligence y resumen de empresa.';
                                        this.btnEnviar = true;
                                    }
                                }else{
                                    if(this.listaAds === false){
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de vinculación, planes de asistencia tecnica, due dilligence y ads.';
                                        this.btnEnviar = true;
                                    }else{
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de vinculación, planes de asistencia tecnica y due dilligence.';
                                        this.btnEnviar = true;
                                    }
                                }
                            }else{
                                if(this.listaResumenEmpresa === false){
                                    if(this.listaAds === false){
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de vinculación, planes de asistencia tecnica, resumen de empresa y ads.';
                                        this.btnEnviar = true;
                                    }else{
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de vinculación, planes de asistencia tecnica y resumen de empresa.';
                                        this.btnEnviar = true;
                                    }
                                }else{
                                    if(this.listaAds === false){
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de vinculación, planes de asistencia tecnica y ads';
                                        this.btnEnviar = true;
                                    }else{
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de vinculación, planes de asistencia tecnica.';
                                        this.btnEnviar = true;
                                    }
                                }
                            }
                        }else{
                            if(this.listaDueDiligence === false){
                                if(this.listaResumenEmpresa === false){
                                    if(this.listaAds === false){
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de vinculación, due dilligence, resumen de empresa y ads';
                                        this.btnEnviar = true;
                                    }else{
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de vinculación, due dilligence y resumen de empresa.';
                                        this.btnEnviar = true;
                                    }
                                }else{
                                    if(this.listaAds === false){
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de vinculación due dilligence y ads.';
                                        this.btnEnviar = true;
                                    }else{
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de vinculación y due dilligence.';
                                        this.btnEnviar = true;
                                    }
                                }
                            }else{
                                if(this.listaResumenEmpresa === false){
                                    if(this.listaAds === false){
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de vinculación, resumen de empresa y ads';
                                        this.btnEnviar = true;
                                    }else{
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de vinculación y resumen de empresa.';
                                        this.btnEnviar = true;
                                    }
                                }else{
                                    if(this.listaAds === false){
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de vinculación y ads.';
                                        this.btnEnviar = true;
                                    }else{
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de vinculación.';
                                        this.btnEnviar = true;
                                    }
                                }
                            }
                        }
                    }else{
                        
                        if(this.listaPlanesAsistenciaTecnica === false){
                            if(this.listaDueDiligence === false){
                                if(this.listaResumenEmpresa === false){
                                    if(this.listaAds === false){
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de planes de asistencia tecnica, due dilligence, resumen de empresa y ads.';
                                        this.btnEnviar = true;
                                    }else{
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de planes de asistencia tecnica, due dilligence y resumen de empresa.';
                                        this.btnEnviar = true;
                                    }
                                }else{
                                    if(this.listaAds === false){
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de planes de asistencia tecnica, due dilligence y ads.';
                                        this.btnEnviar = true;
                                    }else{
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de planes de asistencia tecnica y due dilligence.';
                                        this.btnEnviar = true;
                                    }
                                }
                            }else{
                                if(this.listaResumenEmpresa === false){
                                    if(this.listaAds === false){
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de planes de asistencia tecnica, resumen de empresa y ads.';
                                        this.btnEnviar = true;
                                    }else{
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de planes de asistencia tecnica y resumen de empresa.';
                                        this.btnEnviar = true;
                                    }
                                }else{
                                    if(this.listaAds === false){
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de planes de asistencia tecnica y ads';
                                        this.btnEnviar = true;
                                    }else{
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de planes de asistencia tecnica.';
                                        this.btnEnviar = true;
                                    }
                                }
                            }
                        }else{
                            if(this.listaDueDiligence === false){
                                if(this.listaResumenEmpresa === false){
                                    if(this.listaAds === false){
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de due dilligence, resumen de empresa y ads';
                                        this.btnEnviar = true;
                                    }else{
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de due dilligence y resumen de empresa.';
                                        this.btnEnviar = true;
                                    }
                                }else{
                                    if(this.listaAds === false){
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de due dilligence y ads.';
                                        this.btnEnviar = true;
                                    }else{
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de due dilligence.';
                                        this.btnEnviar = true;
                                    }
                                }
                            }else{
                                if(this.listaResumenEmpresa === false){
                                    if(this.listaAds === false){
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de resumen de empresa y ads';
                                        this.btnEnviar = true;
                                    }else{
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de resumen de empresa.';
                                        this.btnEnviar = true;
                                    }
                                }else{
                                    if(this.listaAds === false){
                                        this.dialogConfirmarEstadoText = 'Debe agregar documentos de ads.';
                                        this.btnEnviar = true;
                                    }
                                }
                            }
                        }
                    }
                    
                }
            }else {
                this.dialogConfirmarEstadoText = 'La solicitud ya fue enviada.';
                this.btnEnviar = true;
            }
            this.btnConfirmarEstadoText='Enviar';
            this.dialogConfirmarEstado=true;
        },
        //!Mostrar modal con documentos de las acciones almacenados y para poder almacenar(subir) nuevos documentos
        mostrarModalDocumentos(idAccion, tipoDocumento){
            //array1.forEach(element => console.log(element));
            

            if(tipoDocumento === 1){
                this.modalTitleDoc = 'Cargar Documentos'
            }else if(tipoDocumento === 2){
                this.modalTitleDoc = 'Cargar Anexos'
            }else if(tipoDocumento === 3){
                this.modalTitleDoc = 'Cargar Documentos Legales'
            }
            this.dialogLoaderVisible=true;
            this.obtenerDocumentos(idAccion,tipoDocumento);
            this.dialogDoc=true;
            this.dialogLoaderVisible=false;
        },
         //!Mostrar modal con documentos de la solicitud almacenados y para poder almacenar(subir) nuevos documentos
        async mostrarModalDocumentosSolicitud(tipoDocumento){

            let tipo = '';
            this.dialogLoaderVisible=true;
            if(tipoDocumento === 4){
                if(this.listaAcciones === true){
                    this.modalTitleDoc = 'Cargar Documentos Solicitud Participación'
                    this.verTipo = true;
                    tipo = 'Documentos Solicitud Participación';
                    await this.obtenertiposDocumentos(4);
                    this.mostralModalDocSolicitud = true;
                }else{
                    this.$refs.snackalert.SnackbarShow('warning', 'Alerta', `Debe agregar acciones a la solicitud.`);
                    this.mostralModalDocSolicitud = false;
                
                }

            }else if(tipoDocumento === 5){
                //tipo de documento necesita aprobacion AID


                this.modalTitleDoc = 'Cargar Documentos Vinculación'
                this.verTipo = true;
                tipo = 'Documentos Vinculación';
                await this.obtenertiposDocumentos(5);
                this.mostralModalDocSolicitud = true;
            }else if(tipoDocumento === 6){
                this.modalTitleDoc = 'Cargar Documentos Planes Asistencia Técnica'
                this.verTipo = false;
                //this.datosDocumentoSolicitud.tipo_Vinculacion_Solicitud_Id = 12;
                delete this.datosDocumentoSolicitud.tipo_Vinculacion_Solicitud_Id;
                this.mostralModalDocSolicitud = true;
            }else if(tipoDocumento === 9){
                this.modalTitleDoc = 'Cargar Documentos Due Dilligence'
                this.verTipo = false;
                //this.datosDocumentoSolicitud.tipo_Vinculacion_Solicitud_Id = 12;
                delete this.datosDocumentoSolicitud.tipo_Vinculacion_Solicitud_Id;
                this.mostralModalDocSolicitud = true;
            }else if(tipoDocumento === 10){
                this.modalTitleDoc = 'Cargar Documentos Resumen de Empresa'
                this.verTipo = false;
                //this.datosDocumentoSolicitud.tipo_Vinculacion_Solicitud_Id = 12;
                delete this.datosDocumentoSolicitud.tipo_Vinculacion_Solicitud_Id;
                this.mostralModalDocSolicitud = true;
            }else if(tipoDocumento === 11){
                this.modalTitleDoc = 'Cargar Documentos ADS'
                this.verTipo = false;
                //this.datosDocumentoSolicitud.tipo_Vinculacion_Solicitud_Id = 12;
                delete this.datosDocumentoSolicitud.tipo_Vinculacion_Solicitud_Id;
                this.mostralModalDocSolicitud = true;
            }
            if(this.mostralModalDocSolicitud === true){
                if(this.tipoDocumentoMensaje === true){
                    this.$refs.snackalert.SnackbarShow('warning', 'Alerta', `Agregar ${tipo} con el tipo de socio y subtipo de socio correspondiente.`);
                    
                }else{
                    this.tipoDocumento = tipoDocumento;
                    this.dialogDocSolicitud=true;
                }

            }
            this.dialogLoaderVisible=false;
        },
        async obtenertiposDocumentos(tipoDocumento){  
            this.tipos=[];      
            await this.$store
            .dispatch(OBTENER_TIPOS_DOCUMENTO_VINCULACIONSOLICITUD_SOLICITUD, {idEstado: 1, Tipo_Socios_Id: this.datosProspecto.tipo_Socios_Id, SubTipo_Socios_Id: this.datosProspecto.subTipo_Socios_Id,tipo_Documento_HA_Id:tipoDocumento})
            .then(res => {
                 if(res.status===200){
                    this.tipos = this.$store.state.tipovinculacionsolicitud.tiposDocumento;
                    this.tipoDocumentoMensaje = false;
                 }else{
                     this.tipoDocumentoMensaje = true;
                 }
            })
            .catch(() => {
            });
        },
        //Obtener datos de la solicitud
        async obtenerDatosSolicitud(id){  
            this.dialogLoaderVisible = true;
            await this.$store
            .dispatch(OBTENER_SOLICITUD_SPS,id)
            .then(res => {
                if(res.status === 200){
                    this.datosSolicitud = this.$store.state.solicitudparticipacionsps.solicitudSps;
                    this.obtenerEstadoSolicitud(id);
                    if(this.datosSolicitud.empresas_Id){
                        //console.log('empresa');
                        this.obtenerEmpresa(this.datosSolicitud.empresas_Id);
                        this.obtenerAcciones(id);
                        this.actualVistaProspecto='DatosProspectoEmpresa';
                        //this.dialogLoaderVisible = false;
                    }
                    else if(this.datosSolicitud.socio_Extranjero_Id){
                        //console.log('socio');
                        this.obtenerSocio(this.datosSolicitud.socio_Extranjero_Id);
                        this.obtenerAcciones(id);
                        this.actualVistaProspecto='DatosProspectoSocioExtranjero';
                        //this.dialogLoaderVisible = false;
                    }
                    else if(this.datosSolicitud.instituciones_Estado_Id){
                        //console.log('institucion');
                        this.obtenerInstitucion(this.datosSolicitud.instituciones_Estado_Id);
                        this.obtenerAcciones(id);
                        this.actualVistaProspecto='DatosProspectoInstitucion';
                        //this.dialogLoaderVisible = false;
                    }
                    this.obtenerDocumentosSolicitudParticipacion(id);
                    this.obtenerDocumentosVinculacion(id);
                    this.obtenerDocumentosAsistenciaTecnica(id);
                    this.obtenerDocumentosDueDiligence(id);
                    this.obtenerDocumentosResumenEmpresa(id);
                    this.obtenerDocumentosADS(id);
                    this.dialogLoaderVisible = false;
                }
            })
            .catch(() => {});
        },
        async obtenerDocumentos(idAccion, tipoDocumento){  
            this.tableDocLoading=true;
            this.accion_Id = idAccion;
            this.tipoDocumento = tipoDocumento;
            this.documentos=[];      
            await this.$store
            .dispatch(OBTENER_DOCUMENTOS_POR_ACCION, {idEstado: 1, idHistorialAccion: idAccion, idTipoDocumento: tipoDocumento})
            .then(res => {
                if(res.status===200)
                {
                   this.documentos = this.$store.state.documentosps.documentos;
                   this.tableDocLoading=false;
                   this.docsAcciones=true;
                   //console.log(this.docsAcciones);
                }
                else
                {
                    this.noDocs = this.noDocs+1;
                    this.mensaje = this.mensaje + idAccion +','; 

                    this.docsAcciones=false;
                }
                this.tableDocLoading=false;
                console.log(this.docsAcciones);
                console.log(this.noDocs);
            })
            .catch(() => {
                 this.tableDocLoading=false;
            });
        },
        async obtenerDocumentosSolicitudParticipacion(idSolicitud){
            //console.log(idSolicitud);
            this.tableDocsParticipacionLoading=true;
            this.docsParticipacion=[];      
            await this.$store
            .dispatch(OBTENER_HISTORIAL_DOCUMENTOS_POR_SOLICITUD, {idTipoDoc: 4, idSolicitudP: idSolicitud})
            .then(res => {
                 if(res.status===200){
                    this.docsParticipacion = this.$store.state.historialdocumentosps.historialDocumentos;
                    this.tableDocsParticipacionLoading=false;
                    this.listaParticipacion=true;
                 }
                 this.tableDocsParticipacionLoading=false;
            })
            .catch(() => {
                 this.tableDocsParticipacionLoading=false;
            });
        },
        async obtenerDocumentosVinculacion(idSolicitud){  
            //console.log(idSolicitud);
            this.tableDocsVinculacionLoading=true;
            this.docsVinculacion=[];      
            await this.$store
            .dispatch(OBTENER_HISTORIAL_DOCUMENTOS_POR_SOLICITUD, {idTipoDoc: 5, idSolicitudP: idSolicitud})
            .then(res => {
                 if(res.status===200){
                    this.docsVinculacion = this.$store.state.historialdocumentosps.historialDocumentos;
                    this.tableDocsVinculacionLoading=false;
                    this.listaVinculacion=true;
                 }
                 this.tableDocsVinculacionLoading=false;
            })
            .catch(() => {
                 this.tableDocsVinculacionLoading=false;
            });
        },
        async obtenerDocumentosAsistenciaTecnica(idSolicitud){  
            //console.log(idSolicitud);
            this.tableDocsAsistenciaLoading=true;
            this.docsAsistencia=[];      
            await this.$store
            .dispatch(OBTENER_HISTORIAL_DOCUMENTOS_SIN_TIPO_POR_SOLICITUD, {idTipoDoc: 6, idSolicitudP: idSolicitud})
            .then(res => {
                 if(res.status===200){
                    this.docsAsistencia = this.$store.state.historialdocumentosps.historialDocumentos;
                    this.tableDocsAsistenciaLoading=false;
                    this.listaPlanesAsistenciaTecnica=true;
                 }else{
                     this.listaPlanesAsistenciaTecnica=false;
                 }
                 this.tableDocsAsistenciaLoading=false;
            })
            .catch(() => {
                 this.tableDocsAsistenciaLoading=false;
            });
        },
        async obtenerDocumentosDueDiligence(idSolicitud){  
            //console.log(idSolicitud);
            this.tableDocsDueDiligence=true;
            this.docsDueDiligence=[];      
            await this.$store
            .dispatch(OBTENER_HISTORIAL_DOCUMENTOS_SIN_TIPO_POR_SOLICITUD, {idTipoDoc: 9, idSolicitudP: idSolicitud})
            .then(res => {
                 if(res.status===200){
                    this.docsDueDiligence = this.$store.state.historialdocumentosps.historialDocumentos;
                    this.tableDocsDueDiligence=false;
                    this.listaDueDiligence=true;
                 }else{
                     this.listaDueDiligence=false;
                 }
                 this.tableDocsDueDiligence=false;
            })
            .catch(() => {
                 this.tableDocsDueDiligence=false;
            });
        },
        async obtenerDocumentosResumenEmpresa(idSolicitud){
            //console.log(idSolicitud);
            this.tableDocsResumenEmpresa=true;
            this.docsResumenEmpresa=[];      
            await this.$store
            .dispatch(OBTENER_HISTORIAL_DOCUMENTOS_SIN_TIPO_POR_SOLICITUD, {idTipoDoc: 10, idSolicitudP: idSolicitud})
            .then(res => {
                 if(res.status===200){
                    this.docsResumenEmpresa = this.$store.state.historialdocumentosps.historialDocumentos;
                    this.tableDocsResumenEmpresa=false;
                    this.listaResumenEmpresa=true;
                 }else{
                     this.listaResumenEmpresa=false;
                 }
                 this.tableDocsResumenEmpresa=false;
            })
            .catch(() => {
                 this.tableDocsResumenEmpresa=false;
            });
        },
        async obtenerDocumentosADS(idSolicitud){  
            //console.log(idSolicitud);
            this.tableAdsLoading=true;
            this.docsAds=[];      
            await this.$store
            .dispatch(OBTENER_HISTORIAL_DOCUMENTOS_SIN_TIPO_POR_SOLICITUD, {idTipoDoc: 11, idSolicitudP: idSolicitud})
            .then(res => {
                 if(res.status===200){
                    this.docsAds = this.$store.state.historialdocumentosps.historialDocumentos;
                    this.tableAdsLoading=false;
                    this.listaAds=true;
                 }else{
                     this.listaAds=false;
                 }
                 this.tableAdsLoading=false;
            })
            .catch(() => {
                 this.tableAdsLoading=false;
            });
        },
        //!Metodo que llama a cargar documento (carga en el servidor) para luego almacenar el registro en el api
        registrarDocumento(){
            this.btnRegistroDocLoading=true;
            this.cargarDocumento()
            .then(()=>{
                //?Validar que el archivo fue cargado
                if(this.archivoCargado){
                    this.almacenarDatosArchivo();
                }
            })
            .catch(() => {
                this.btnRegistroLoading=false;
            }); 
        },
        //!Metodo que llama a cargar documento (carga en el servidor) para luego almacenar el registro en el api
        registrarDocumentoSolicitud(){
            this.btnRegistroDocLoadingSol=true;
            this.cargarDocumentoSolicitud()
            .then(()=>{
                //?Validar que el archivo fue cargado
                if(this.archivoCargado){
                    this.almacenarDatosArchivoSolicitud();
                    
                }
            })
            .catch(() => {
                this.btnRegistroDocLoadingSol=false;
            }); 
        },
        //!Almacenar el documento acciones
        async cargarDocumento(){
            const doc = this.docFile;
            this.btnRegistroDocLoading = true;
            await this.$store
                .dispatch(CARGAR_ARCHIVO, {file: doc, path: `\\documentos\\solicitudes_participacion\\${this.idSolicitud}\\acciones\\${this.accion_Id}\\`})
                .then(res => {
                    //!Si se almacenó el archivo correctamente, cambiar el valor de arhivoCargado a true.
                    if(res.status===200){
                        
                        this.datosDocumento.path = res.pathArchivo;
                        this.archivoCargado =true;
                        return true;
                    } else {
                        this.$refs.snackalert.SnackbarShow('warning', 'Alerta', `Ha ocurrido un error durante el registro.`);
                        this.archivoCargado =false;
                    }
                })
                .catch(err => {
                    this.$refs.snackalert.SnackbarShow('warning', 'Alerta', `Ha ocurrido un error, por favor ponte en contacto con un adminisrador del sistema. ${err}`);
                    this.btnRegistroDocLoading=false;
                    this.dialogLoaderVisible=false;
                    return false;
                });
        },
        //!Almacenar el documento solicitud
        async cargarDocumentoSolicitud(){
            const doc = this.docFile;
            let path = '';
            this.btnRegistroDocLoadingSol = true;
            if(this.tipoDocumento === 4){
                path = `\\documentos\\solicitudes_participacion\\${this.idSolicitud}\\documentos\\participacion\\`;
            }else if(this.tipoDocumento === 5){
                path = `\\documentos\\solicitudes_participacion\\${this.idSolicitud}\\documentos\\vinculacion\\`;
            }else if(this.tipoDocumento === 6){
                path = `\\documentos\\solicitudes_participacion\\${this.idSolicitud}\\documentos\\planesAsistenciaTecnica\\`;
            }else if(this.tipoDocumento === 9){
                path = `\\documentos\\solicitudes_participacion\\${this.idSolicitud}\\documentos\\dueDilligence\\`;
            }else if(this.tipoDocumento === 10){
                path = `\\documentos\\solicitudes_participacion\\${this.idSolicitud}\\documentos\\resumenEmpresa\\`;
            }else if(this.tipoDocumento === 11){
                path = `\\documentos\\solicitudes_participacion\\${this.idSolicitud}\\documentos\\ads\\`;
            }
            
            await this.$store
                .dispatch(CARGAR_ARCHIVO, {file: doc, path: path})
                .then(res => {
                    //!Si se almacenó el archivo correctamente, cambiar el valor de arhivoCargado a true.
                    if(res.status===200){
                        //console.log(this.datosDocumentoSolicitud);
                        this.datosDocumentoSolicitud.path = res.pathArchivo;
                        this.archivoCargado =true;
                        return true;
                    } else {
                        this.$refs.snackalert.SnackbarShow('warning', 'Alerta', `Ha ocurrido un error durante el registro.`);
                        this.archivoCargado =false;
                    }
                })
                .catch(err => {
                    this.$refs.snackalert.SnackbarShow('warning', 'Alerta', `Ha ocurrido un error, por favor ponte en contacto con un adminisrador del sistema. ${err}`);
                    this.btnRegistroDocLoadingSol=false;
                    this.dialogLoaderVisible=false;
                    return false;
                });
        },
        async almacenarDatosArchivo(){
            this.datosDocumento.historial_Acciones_Id = this.accion_Id;
            this.datosDocumento.tipo_Documento_HA_Id = this.tipoDocumento;
            this.datosDocumento.icono = 'pdf';
            this.datosDocumento.estados_Id = 1;
            this.$store
                .dispatch(REGISTRAR_DOCUMENTO, this.datosDocumento)
                .then(res2 => {
                    //console.log(res2)
                    if(res2.status===200){
                        this.$refs.snackalert.SnackbarShow('success', 'Mensaje', res2.mensaje);
                        //this.dialogDoc = false;
                        this.resetFormDoc();
                        this.obtenerAcciones(this.idSolicitud);
                        document.querySelector('#docFile').value = '';
                        this.$refs.docFile.reset();
                        this.obtenerDocumentos(this.accion_Id,this.tipoDocumento);
                    } else {
                        this.$refs.snackalert.SnackbarShow('warning', 'Alerta', res2.mensaje);
                    }
                    this.btnRegistroDocLoading=false;
                    this.dialogLoaderVisible=false;
                })
                .catch(err => {
                    this.btnRegistroDocLoading=false;
                    this.dialogLoaderVisible=false;
                    this.$refs.snackalert.SnackbarShow('warning', 'Alerta', `Ha ocurrido un error, por favor ponte en contacto con un adminisrador del sistema. ${err}`);
                });

        },
        async almacenarDatosArchivoSolicitud(){
            //console.log(this.tipoDocumento);
            this.datosDocumentoSolicitud.id = 0;
            this.datosDocumentoSolicitud.tipo_Documento_HA_Id = this.tipoDocumento;
            this.datosDocumentoSolicitud.solicitud_Participacion_Id = this.idSolicitud;
            //console.log(this.datosDocumentoSolicitud.tipo_Documento_HA_Id);

            if(this.datosSolicitud.estados_SPS_Id === 11){
                if(this.selectedCheck === true){
                    this.datosDocumentoSolicitud.estados_Id = 5;
                }
            }
            
            await this.$store
                .dispatch(REGISTRAR_HISTORIAL_DOCUMENTO, this.datosDocumentoSolicitud)
                .then(res2 => {
                    //console.log(res2)
                    if(res2.status===200){
                        this.$refs.snackalert.SnackbarShow('success', 'Mensaje', res2.mensaje);
                        //this.dialogDoc = false;
                        this.resetFormDocSolicitud();
                        document.querySelector('#docFile').value = '';
                        this.$refs.docFile.reset();
                        if(this.tipoDocumento === 4){
                            this.obtenerDocumentosSolicitudParticipacion(this.idSolicitud);
                        }else if(this.tipoDocumento === 5){
                            this.obtenerDocumentosVinculacion(this.idSolicitud);
                        }else if(this.tipoDocumento === 6){
                            this.obtenerDocumentosAsistenciaTecnica(this.idSolicitud);
                        }else if(this.tipoDocumento === 9){
                            this.obtenerDocumentosDueDiligence(this.idSolicitud);
                        }else if(this.tipoDocumento === 10){
                            this.obtenerDocumentosResumenEmpresa(this.idSolicitud);
                        }else if(this.tipoDocumento === 11){
                            this.obtenerDocumentosADS(this.idSolicitud);
                        }
                        if(this.datosSolicitud.estados_SPS_Id === 11){
                            if(this.selectedCheck === true){
                                
                                this.enviar();
                            }
                        }
                        this.dialogDocSolicitud = false;

                        //this.obtenerDocumentos(this.accion_Id,this.tipoDocumento);
                    } else {
                        this.$refs.snackalert.SnackbarShow('warning', 'Alerta', res2.mensaje);
                    }
                    this.btnRegistroDocLoading=false;
                    this.btnRegistroDocLoadingSol=false;
                })
                .catch(err => {
                    this.btnRegistroDocLoading=false;
                    this.btnRegistroDocLoadingSol=false;
                    this.$refs.snackalert.SnackbarShow('warning', 'Alerta', `Ha ocurrido un error, por favor ponte en contacto con un adminisrador del sistema. ${err}`);
                });

        },
        //!Asignar el archivo
        onFileChange(e){
            //this.docFile = e
            if(e){
                //!?Validar que el tipo de archivo sea pdf
                //console.log(e.type);
                if (e.type != "application/pdf"){
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
        //!Restablecer los campos del formulario del documento acciones
        resetFormDoc(){
            this.datosDocumento = {
                id:0,
                nombre: '',
                path: '',
                fecha_Ingreso: "2021-08-31",
                usuario_Ingreso: "admin",
                historial_Acciones_Id: 0,
                icono: 'pdf',
                fecha_Documento: "2021-08-31",
                estados_Id: 1,
                tipo_Documento_HA_Id: 0
            }
        },
        //!Restablecer los campos del formulario del documento solicitud
        resetFormDocSolicitud(){
            this.datosDocumentoSolicitud = {
                id:0,
                nombre:'',
                path:'',
                fecha_Creacion:"2021-08-31",
                usuario_Creacion:'admin',
                tipo_Documento_HA_Id:0,
                estados_Id:3,
                solicitud_Participacion_Id:0,
                tipo_Vinculacion_Solicitud_Id:0,
                
            }
            this.mensajeTipoDoc='';
        },
        async obtenerEstadoSolicitud(id){
            await this.$store
            .dispatch(OBTENER_ESTADO_SOLICITUD_SPS,id)
            .then(res => {
                if(res.status === 200){
                    //console.log(res);
                    this.dotosS = this.$store.state.estadosolicitud.estado;
                    //console.log(this.dotosS);
                }
                
            })
            .catch(() => {});
        },
        //Obtener datos de la empresa
        async obtenerEmpresa(id){  
            
            await this.$store
            .dispatch(OBTENER_EMPRESA_DESCRIPCIONES,id)
            .then(res => {
                if(res.status === 200){
                    this.datosProspecto = this.$store.state.empresa.empresa;
                }
                
            })
            .catch(() => {});
        },
        //Obtener datos del socio
        async obtenerSocio(id){  
            //console.log(id);
            await this.$store
            .dispatch(OBTENER_SOCIO_EXTRANJERO_DESCRIPCIONES,id)
            .then(res => {
                if(res.status === 200){
                    this.datosProspecto = this.$store.state.socioextranjero.socioExtranjero;
                }
            })
            .catch(() => {});
        },
         //Obtener datos de la institucion
        async obtenerInstitucion(id){  
            //console.log(id);
            await this.$store
            .dispatch(OBTENER_INSTITUCION_DESCRIPCIONES,id)
            .then(res => {
                //console.log(res.data);
                if(res.status === 200){
                    this.datosProspecto = this.$store.state.institucion.institucion;
                }
            })
            .catch(() => {});
        },
        // async validarDocsAciones(){
        //     //console.log(this.docsAcciones);
        //     this.noDocs = 0;
        //     this.mensaje = 'Agregar Documentos a la accion'; 
        //     this.acciones.forEach(element => {
        //         //console.log('------------------------');
        //         //console.log(element.id); 
        //          this.obtenerDocumentos(element.id,1);
        //     });

        //     if(this.noDocs !== 0){
        //         console.log(this.mensaje);
        //     }
        // },
        async obtenerAcciones(idSolicitud){  
            this.tableAccionesLoading = true;
            await this.$store
            .dispatch(OBTENER_HISTORIAL_ACCIONES_BY_SOLICITUD,idSolicitud)
            .then(res => {
                if(res.status === 200){
                    this.acciones = this.$store.state.historialacciones.acciones;
                    this.tableAccionesLoading = false;
                    this.listaAcciones = true;
                    //this.validarDocsAciones();
                }else{
                    this.listaAcciones = false;
                }
                this.tableAccionesLoading = false;
            })
            .catch(() => {});
        },
        async obtenerMediosVerificacion(){  
            //this.tableAccionesLoading = true;
            await this.$store
            .dispatch(OBTENER_MEDIOS,1)
            .then(res => {
                if(res.status === 200){
                    this.mediosVerificacion = this.$store.state.medioverificacion.medios;
                }
            })
            .catch(() => {});
        },
        obtenerDatosItem(id){
            this.dialogLoaderVisible=true;
            this.datosAccion.id = id;
            this.accion=2;
            this.modalTitle='Actualizar acción';
            this.btnRegistroText='Actualizar acción';

            this.$store
                .dispatch(OBTENER_ACCION, id)
                .then(res => {
                    if(res.status === 200){
                        this.datosAccion = this.$store.state.historialacciones.accion;
                        this.datosAccion.estados_Id === 1 ? this.switchItemEstado = true : this.switchItemEstado = false;
                        //console.log(this.datosEtnia)
                        this.dialog = true;
                        this.dialogLoaderVisible = false;

                        if(this.datosAccion.fecha_Visita !== null) {
                        //console.log(this.datosAccion.fecha_Visita);
                        this.fechas.fecha_Visita = moment(this.datosAccion.fecha_Visita).format('YYYY-MM-DD');
                         //console.log(this.fechas.fecha_Visita);
                        }
                    }

                })
                .catch(error => {
                    this.dialogLoaderVisible = false;
                    console.log(error)
                });
        },
        registrarAccion(){     
            this.btnRegistroLoading=true;

            this.switchItemEstado ? this.datosAccion.estados_Id = 1 : this.datosAccion.estados_Id = 2;
            this.datosAccion.solicitud_Participacion_Id = this.idSolicitud;
            if(this.accion===1){
                this.datosAccion.id = 0;
                this.$store
                    .dispatch(REGISTRAR_ACCION, this.datosAccion)
                    .then(res => {
                        //console.log(res)
                        if(res.status===200){
                            this.obtenerAcciones(this.idSolicitud);
                            this.dialog=false;
                            this.$refs.snackalert.SnackbarShow('success', 'Mensaje', res.mensaje);
                            this.resetForm();
                        } else {
                            this.$refs.snackalert.SnackbarShow('warning', 'Alerta', res.mensaje);
                        }
                        this.btnRegistroLoading=false;
                        this.switchItemEstado = true;
                    })
                    .catch(error => {
                        //console.log(error)
                        this.$refs.snackalert.SnackbarShow('warning', 'Alerta', error);
                        this.btnRegistroLoading=false;
                    });
            } else {
                this.$store
                    .dispatch(ACTUALIZAR_ACCION, this.datosAccion)
                    .then(res => {
                        //console.log(res)
                        if(res.status===200){
                            //this.obtnenerItems();
                            this.obtenerAcciones(this.idSolicitud);
                            this.dialog=false;
                            this.$refs.snackalert.SnackbarShow('success', 'Mensaje', res.mensaje);
                            this.resetForm();    
                        } else {
                            this.$refs.snackalert.SnackbarShow('warning', 'Alerta', res.mensaje);
                        }
                        this.btnRegistroLoading=false;
                        this.switchItemEstado = true;
                    })
                    .catch(error => {
                        //console.log(error)
                        this.$refs.snackalert.SnackbarShow('warning', 'Alerta', error);
                        this.btnRegistroLoading=false;
                    });

            }
        },
        resetForm(){
            //this.$refs.form.reset();
            this.datosAccion = {
                id:0,
                fecha_Visita: '',
                observaciones: '',
                fecha_Ingreso: '2021-07-23',
                usuario_Ingreso: 'admin',
                medio_Verificacion_Id: 0,
                solicitud_Participacion_Id: 0,
                estados_Id: 1
            }
            //this.fechas.fecha_Visita = "";         
        },
        //Cambiar estado a la solicitud
        async enviar(){  
            this.dialogLoaderVisible = true;
            this.dialogConfirmarEstado = false;
            let mensaje = '';

            if(this.datosSolicitud.estados_SPS_Id === 1){
                this.datosSolicitud.estados_SPS_Id = 2;
                mensaje = 'La solicitud fue enviada a prevalidación';
                this.historialAutorizacion.estados_SPS_Id_Actual=2;
                this.historialAutorizacion.estados_SPS_Id_Anterior=1;

            }else if(this.datosSolicitud.estados_SPS_Id === 4){
                 this.datosSolicitud.estados_SPS_Id = 5;
                mensaje = 'La solicitud fue enviada para previnculación';
                this.historialAutorizacion.estados_SPS_Id_Actual=5;
                this.historialAutorizacion.estados_SPS_Id_Anterior=4;

            }else if(this.datosSolicitud.estados_SPS_Id === 11){//15
                if(this.selectedCheck === true){
                    this.datosSolicitud.estados_SPS_Id = 16;
                    this.historialAutorizacion.estados_SPS_Id_Actual=16;
                    this.historialAutorizacion.estados_SPS_Id_Anterior=11;
                }
            }
            await this.$store
            .dispatch(ACTUALIZAR_SOLICITUD_SPS,this.datosSolicitud)
            .then(res => {
                
                if(res.status === 200){
                    if(this.datosSolicitud.estados_SPS_Id === 16){
                        if(this.datosProspecto.estado_Socios_Id === 6 ){//aid autorizado (9)
                            if(this.selectedCheck === true){

                                this.activarSocio();

                                this.crearHistorial();
                            }else{
                                this.$refs.snackalert.SnackbarShow('success', 'Mensaje', mensaje);
                                this.obtenerDatosSolicitud(this.idSolicitud);
                                //this.crearHistorial();// por que no esta enviando solo subiendo archivo
                            }
                        }else{
                            this.$refs.snackalert.SnackbarShow('success', 'Mensaje', mensaje);
                            this.obtenerDatosSolicitud(this.idSolicitud);
                            this.crearHistorial();
                        }
                    }else{
                        this.$refs.snackalert.SnackbarShow('success', 'Mensaje', mensaje);
                        this.obtenerDatosSolicitud(this.idSolicitud);
                        this.crearHistorial();
                    }
                    
                }else{
                    this.$refs.snackalert.SnackbarShow('warning', 'Alerta', res.mensaje);
                    //this.obtenerDatosSolicitud(this.idSolicitud);
                    //this.crearHistorial();
                }
                this.dialogLoaderVisible = false;

            })
            .catch(() => {});
        },

        async activarSocio(){
            await this.$store
            .dispatch(ACTIVAR_SOCIO,this.datosSolicitud )
            .then(res => {
                if(res.status===200){
                    this.$refs.snackalert.SnackbarShow('success', 'Mensaje', res.mensaje);
                    this.obtenerDatosSolicitud(this.idSolicitud);
                } else {
                    this.$refs.snackalert.SnackbarShow('warning', 'Alerta', res.mensaje);
                }
            })
            .catch(err => {
                this.$refs.snackalert.SnackbarShow('warning', 'Alerta', 'Ha ocurrido un error al realizar la solicitud.'+err);
            });
        },
        async cambiarEstadoProspecto(estadoId){
            //console.log(this.datosProspecto);
            this.btnConfirmarEstadoLoading=true;
            let datosItem = {
                tipo_Socios_Id: this.datosProspecto.tipo_Socios_Id,
                estado_Socios_Id: estadoId
            }
            await this.$store
            .dispatch(ACTUALIZAR_ESTADO_ITEM, {id: this.datosProspecto.id, datosItem: datosItem})
            .then(res => {
                if(res.status===200){
                    this.$refs.snackalert.SnackbarShow('success', 'Mensaje', res.mensaje);
                } else {
                    this.$refs.snackalert.SnackbarShow('warning', 'Alerta', res.mensaje);
                }
            })
            .catch(err => {
                this.$refs.snackalert.SnackbarShow('warning', 'Alerta', 'Ha ocurrido un error al realizar la solicitud.'+err);
            });
        },
        //Registrar historial de la solicitud
        async crearHistorial(){  
            this.historialAutorizacion.solicitud_Participacion_Id=this.idSolicitud;
            this.dialogLoaderVisible = true;
            await this.$store
            .dispatch(REGISTRAR_HISTORIAL_AUTORIZACION,this.historialAutorizacion)
            .then(res => {
                //console.log(res);
                if(res.status === 200){
                    //this.$refs.snackalert.SnackbarShow('success', 'Mensaje', 'La solicitud fue enviada para Autorizacion');
                }
                this.dialogLoaderVisible = false;
            })
            .catch(() => {});
        },
        //!Mostrar el modal para el registro de un nuevo item
        modalNueva(){
            this.accion =1;
            //this.modalTitle='Registrar etnia';
            //this.btnRegistroText='Registrar etnia';
            
            this.dialog=true;
        },
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
                    text: "Fecha de la Visita",
                    value: "fecha_Visita"
                },
                {
                    text: "Observaciones",
                    value: "observaciones"
                },
                {
                    text: "Medio Verificación",
                    value: "medio_Verificacion"
                },
                                {
                    text: "Fecha de Ingreso",
                    value: "fecha_Ingreso"
                },
                {
                    text: "Estado",
                    value: "estado_Id"
                },
                {
                    text: "Acciones",
                    value: "Acciones"
                }
            ]
        },
        documentosHeaders(){
            return [
                //  {
                //     text: "Id",
                //     align: "start",
                //     sortable: false,
                //     value: "id"
                // },
                {
                    text: "Descripción Acción",
                    align: "start",
                    sortable: true,
                    value: "nombre"
                },
                {
                    text: "Fecha de Ingreso",
                    align: "start",
                    sortable: true,
                    value: "fecha_Ingreso"
                },
                 {
                    text: "Acciones",
                    align: "start",
                    sortable: false,
                    value: "acciones"
                },

            ]
        },
        headersParticipacion(){
            return [
                //  {
                //     text: "Id",
                //     align: "start",
                //     sortable: false,
                //     value: "id"
                // },
                {
                    text: "Descripción del Archivo",
                    align: "start",
                    sortable: true,
                    value: "nombre"
                },
                {
                    text: "Tipo documento",
                    align: "start",
                    sortable: true,
                    value: "tipo_Vinculacion_Solicitud"
                },
                {
                    text: "Fecha de Ingreso",
                    align: "start",
                    sortable: true,
                    value: "fecha_Creacion"
                },
                {
                    text: "Estado",
                    align: "start",
                    sortable: true,
                    value: "estado"
                },
                {
                    text: "Acciones",
                    align: "start",
                    sortable: false,
                    value: "acciones"
                },

            ]
        },
        headersVinculacion(){
            return [
                //  {
                //     text: "Id",
                //     align: "start",
                //     sortable: false,
                //     value: "id"
                // },
                {
                    text: "Descripción del Archivo",
                    align: "start",
                    sortable: true,
                    value: "nombre"
                },
                                {
                    text: "Tipo documento",
                    align: "start",
                    sortable: true,
                    value: "tipo_Vinculacion_Solicitud"
                },
                {
                    text: "Fecha de Ingreso",
                    align: "start",
                    sortable: true,
                    value: "fecha_Creacion"
                },
                {
                    text: "Estado",
                    align: "start",
                    sortable: true,
                    value: "estado"
                },
                {
                    text: "Acciones",
                    align: "start",
                    sortable: false,
                    value: "acciones"
                },

            ]
        },
        headersAsistencia(){
            return [
                //  {
                //     text: "Id",
                //     align: "start",
                //     sortable: false,
                //     value: "id"
                // },
                {
                    text: "Descripción del Archivo",
                    align: "start",
                    sortable: true,
                    value: "nombre"
                },
                {
                    text: "Fecha de Ingreso",
                    align: "start",
                    sortable: true,
                    value: "fecha_Creacion"
                },
                {
                    text: "Estado",
                    align: "start",
                    sortable: true,
                    value: "estado"
                },
                {
                    text: "Acciones",
                    align: "start",
                    sortable: false,
                    value: "acciones"
                },

            ]
        },
        comentariosHeaders(){
            return [
                {
                    text: 'Observación',
                    align: 'start',
                    sortable: true,
                    value: 'comentario',
                },
                { text: 'Fecha Ingreso', value: 'fecha_Ingreso' },
                { text: 'Bandeja', value: 'estadoSPS' },
            ]
        },
        //Cambiar el formato de fechas a DD-MM-YYY para mostrar y a YYYY-MM-DD para registrar en datosEmpresa.fecha_Nacimiento
        fechaNacimiento:{
            get: function(){
                return this.fechas.fecha_Visita
                ? moment(this.fechas.fecha_Visita).format("DD-MM-YYYY")
                : null;
            },
            set: function(val){
                
                this.datosAccion.fecha_Visita = moment(val, 'DD-MM-YYYY').format('YYYY-MM-DD');
                //console.log(this.datosEmpresa.fecha_Nacimiento )
                return val;
            }
        }, 
    },
        watch: {
        
        //Cambiar el formato de fecha de nacimiento del objeto datosEmpresa al momento de que fechas.fechaNacimiento cambie
        'fechas.fecha_Visita': function(val){
            this.datosAccion.fecha_Visita = val;
        },
      fechaNacimientoxx: {
          get: function (val) {
            //this.datosEmpresa.fecha_Nacimiento = moment(val).format("YYYY-MM-DD");
            return this.datosAccion.fecha_Visita = moment(val, 'DD-MM-YYYY').format('YYYY-MM-DD')
           // console.log(this.datosEmpresa.fecha_Nacimiento)
          },
          set: function (newValue) {
               return this.datosAccion.fecha_Visita = moment(newValue, 'DD-MM-YYYY').format('YYYY-MM-DD')
          }
      },

       menuFechaNacimiento (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    }
}
</script>
<style lang="">
    
</style>