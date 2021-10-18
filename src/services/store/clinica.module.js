/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const OBTENER_CLINICAS = "obtenerClinicas";
export const OBTENER_CLINICA = "obtenerClinica";
export const REGISTRAR_CLINICA = "registrarClinica";
export const ACTUALIZAR_CLINICA = "actuañizarClinica";
// mutation types
export const SET_CLINICAS = "setClinicas";
export const SET_CLINICA = "setClinica";

const state = {
    clinicas: [],
    clinica:[],
}

const getters = {
    obtenerClinicas(state) {
      return state.clinicas;
    },
}

const actions = {
    async [OBTENER_CLINICAS](context, estadoId) {
        /*
        * Si el estado es null va a traer a todos los usuarios, de lo contrario va a traer los usuarios por estado
        *
        */
        let endpoint = 'api/Clinica';
        if(estadoId){
            endpoint = `api/Clinica/GetClinicasActivas/${estadoId}`
        }
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_CLINICAS, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    },
    async [OBTENER_CLINICA](context, id){
        
        return new Promise(resolve => {
            ApiService.query(`apiconsume/edit/${id}?endpoint=api/Clinica/`)
                .then(({ data }) => {
                    context.commit(SET_CLINICA, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    },
    async [REGISTRAR_CLINICA](context, datosClinica){
        return new Promise(resolve => {
            ApiService.post(`apiconsume/create?endpoint=api/Clinica`, datosClinica)
                .then(({ data }) => {
                    context.commit(SET_CLINICA, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });   
    },

    async [ACTUALIZAR_CLINICA](context, datosClinica){
        let id = datosClinica.id;
        
        return new Promise(resolve => {
            ApiService.post(`apiconsume/update/${id}?endpoint=api/Clinica/UpdateClinica/`, datosClinica)
                .then(({ data }) => {
                    context.commit(SET_CLINICA, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    }
  }
const mutations = {
    [SET_CLINICAS](state, data) {
        state.clinicas = data;
    },

    [SET_CLINICA](state, data) {
        state.clinica = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}