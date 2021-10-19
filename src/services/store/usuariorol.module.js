/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const OBTENER_ROLES_BY_USUARIO = "obtenerRolesByUsuario";
export const REGISTRAR_ROL_USUARIO = "registrarRolUsuario";
export const ACTUALIZAR_ROL_USUARIO = "actuañizarRolUsuario";
// mutation types
export const SET_ROLES_USUARIO = "setRolesUsuario";
export const SET_ROL_USUARIO = "setRolUsuario";

const state = {
    rolesUsuario: [],
    rolUsuario:[],
}

const getters = {
    obtenerRolesUsuario(state) {
      return state.rolesUsuario;
    },
}

const actions = {
    async [OBTENER_ROLES_BY_USUARIO](context, usuarioId) {
        //console.log(usuarioId);
        /*
        * Si el estado es null va a traer a todos los usuarios, de lo contrario va a traer los usuarios por estado
        *
        */
        let endpoint = `api/Usuarios_Roles/GetUsuariosRolByUsuario/${usuarioId}`
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_ROLES_USUARIO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    },
    // async [OBTENER_ROL](context, id){
        
    //     return new Promise(resolve => {
    //         ApiService.query(`apiconsume/edit/${id}?endpoint=api/Roles/`)
    //             .then(({ data }) => {
    //                 context.commit(SET_ROL_USUARIO, data.data);
    //                 resolve(data)
    //             })
    //             .catch((error) => {
    //                 console.log(error)
    //             });
    //     });    
    // },
    async [REGISTRAR_ROL_USUARIO](context, datosRolUsuario){
        return new Promise(resolve => {
            ApiService.post(`apiconsume/create?endpoint=api/Usuarios_Roles`, datosRolUsuario)
                .then(({ data }) => {
                    context.commit(SET_ROL_USUARIO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });   
    },

    async [ACTUALIZAR_ROL_USUARIO](context, datosRol){
        let id = datosRol.id;
        
        return new Promise(resolve => {
            ApiService.post(`apiconsume/update/${id}?endpoint=api/Roles/UpdateRol/`, datosRol)
                .then(({ data }) => {
                    context.commit(SET_ROL_USUARIO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    }
  }
const mutations = {
    [SET_ROLES_USUARIO](state, data) {
        state.rolesUsuario = data;
    },

    [SET_ROL_USUARIO](state, data) {
        state.rolUsuario = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}