/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const OBTENER_ROLES = "obtenerRoles";
export const OBTENER_ROL = "obtenerRol";
export const REGISTRAR_ROL = "registrarRol";
export const ACTUALIZAR_ROL = "actuañizarRol";
// mutation types
export const SET_ROLES = "setRoles";
export const SET_ROL = "setRol";

const state = {
    roles: [],
    rol:[],
}

const getters = {
    obtenerRoles(state) {
      return state.roles;
    },
}

const actions = {
    async [OBTENER_ROLES](context, estadoId) {
        /*
        * Si el estado es null va a traer a todos los usuarios, de lo contrario va a traer los usuarios por estado
        *
        */
        let endpoint = 'api/Roles';
        if(estadoId){
            endpoint = `api/Roles/GetRolesActivos/${estadoId}`
        }
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_ROLES, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    },
    async [OBTENER_ROL](context, id){
        
        return new Promise(resolve => {
            ApiService.query(`apiconsume/edit/${id}?endpoint=api/Roles/`)
                .then(({ data }) => {
                    context.commit(SET_ROL, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    },
    async [REGISTRAR_ROL](context, datosRol){
        return new Promise(resolve => {
            ApiService.post(`apiconsume/create?endpoint=api/Roles`, datosRol)
                .then(({ data }) => {
                    context.commit(SET_ROL, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });   
    },

    async [ACTUALIZAR_ROL](context, datosRol){
        let id = datosRol.id;
        
        return new Promise(resolve => {
            ApiService.post(`apiconsume/update/${id}?endpoint=api/Roles/UpdateRol/`, datosRol)
                .then(({ data }) => {
                    context.commit(SET_ROL, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    }
  }
const mutations = {
    [SET_ROLES](state, data) {
        state.roles = data;
    },

    [SET_ROL](state, data) {
        state.rol = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}