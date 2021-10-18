/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const OBTENER_TIPOS_PERSONAL = "obtenerTiposPersonal";
export const OBTENER_TIPO_PERSONAL = "obtenerTipoPersonal";
export const REGISTRAR_TIPO_PERSONAL = "registrarTipoPersonal";
export const ACTUALIZAR_TIPO_PERSONAL = "actuañizarTipoPersonal";
// mutation types
export const SET_TIPOS_PERSONAL = "setTiposPersonal";
export const SET_TIPO_PERSONAL = "setTipoPersonal";

const state = {
    tipos: [],
    tipo:[],
}

const getters = {
    obtenerTiposPersonal(state) {
      return state.tipos;
    },
}

const actions = {
    async [OBTENER_TIPOS_PERSONAL](context, estadoId) {
        /*
        * Si el estado es null va a traer a todos los usuarios, de lo contrario va a traer los usuarios por estado
        *
        */
        let endpoint = 'api/Tipo_Personal';
        if(estadoId){
            endpoint = `api/Tipo_Personal/GetTipos_PersonalActivos/${estadoId}`
        }
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_TIPOS_PERSONAL, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    },
    async [OBTENER_TIPO_PERSONAL](context, id){
        
        return new Promise(resolve => {
            ApiService.query(`apiconsume/edit/${id}?endpoint=api/Tipo_Personal/`)
                .then(({ data }) => {
                    context.commit(SET_TIPO_PERSONAL, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    },
    async [REGISTRAR_TIPO_PERSONAL](context, datosTipoPersonal){
        return new Promise(resolve => {
            ApiService.post(`apiconsume/create?endpoint=api/Tipo_Personal`, datosTipoPersonal)
                .then(({ data }) => {
                    context.commit(SET_TIPO_PERSONAL, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });   
    },

    async [ACTUALIZAR_TIPO_PERSONAL](context, datosTipoPersonal){
        let id = datosTipoPersonal.id;
        
        return new Promise(resolve => {
            ApiService.post(`apiconsume/update/${id}?endpoint=api/Tipo_Personal/UpdateClinica/`, datosTipoPersonal)
                .then(({ data }) => {
                    context.commit(SET_TIPO_PERSONAL, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    }
  }
const mutations = {
    [SET_TIPOS_PERSONAL](state, data) {
        state.tipos = data;
    },

    [SET_TIPO_PERSONAL](state, data) {
        state.tipo = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}