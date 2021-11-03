/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const CARGAR_ARCHIVO = "cargarArchivo";
// mutation types
export const SET_ARCHIVOS = "setArchivos";
export const SET_ARCHIVO = "setArchivo";

const state = {
    archivos: [],
    archivo:[],
}

const getters = {
    obtenerArchivos(state) {
      return state.archivos;
    },
}

const actions = {

    //!Cargar el archivo en el servidor
    async [CARGAR_ARCHIVO](context, datos){
        
        
        //console.log(archivo)
        //console.log(datosEmpresa)
        return new Promise(resolve => {
            ApiService.uploadFile(`apiconsume/document`, datos.file, datos.path)
                .then(({ data }) => {
                    //console.log(archivo)
                    context.commit(SET_ARCHIVO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                    //context.commit(SET_ERROR, response.data.errors);
                });
        });    
    }

  }

const mutations = {
    [SET_ARCHIVOS](state, data) {
        state.archivos = data;
    },

    [SET_ARCHIVO](state, data) {
        state.archivo = data;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}