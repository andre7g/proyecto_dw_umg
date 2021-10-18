/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const OBTENER_PROFECIONES = "obtenerProfeciones";
export const OBTENER_PROFECION = "obtenerProfecion";
export const REGISTRAR_PROFECION = "registrarProfecion";
export const ACTUALIZAR_PROFECION = "actuañizarProfecion";
// mutation types
export const SET_PROFECIONES = "setProfeciones";
export const SET_PROFECION = "setProfecion";

const state = {
    profeciones: [],
    profecion:[],
}

const getters = {
    obtenerProfeciones(state) {
      return state.profeciones;
    },
}

const actions = {
    async [OBTENER_PROFECIONES](context, estadoId) {
        /*
        * Si el estado es null va a traer a todos los usuarios, de lo contrario va a traer los usuarios por estado
        *
        */
        let endpoint = 'api/Profecion';
        if(estadoId){
            endpoint = `api/Profecion/GetProfecionActivas/${estadoId}`
        }
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_PROFECIONES, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    },
    async [OBTENER_PROFECION](context, id){
        
        return new Promise(resolve => {
            ApiService.query(`apiconsume/edit/${id}?endpoint=api/Profecion/`)
                .then(({ data }) => {
                    context.commit(SET_PROFECION, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    },
    async [REGISTRAR_PROFECION](context, datosProfecion){
        return new Promise(resolve => {
            ApiService.post(`apiconsume/create?endpoint=api/Profecion`, datosProfecion)
                .then(({ data }) => {
                    context.commit(SET_PROFECION, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });   
    },

    async [ACTUALIZAR_PROFECION](context, datosProfecion){
        let id = datosProfecion.id;
        
        return new Promise(resolve => {
            ApiService.post(`apiconsume/update/${id}?endpoint=api/Profecion/UpdateClinica/`, datosProfecion)
                .then(({ data }) => {
                    context.commit(SET_PROFECION, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    }
  }
const mutations = {
    [SET_PROFECIONES](state, data) {
        state.profeciones = data;
    },

    [SET_PROFECION](state, data) {
        state.profecion = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}