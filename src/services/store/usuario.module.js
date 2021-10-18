/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const OBTENER_USUARIOS = "obtenerUsuarios";
export const OBTENER_USUARIO = "obtenerUsuario";
export const REGISTRAR_USUARIO = "registrarUsuario";
export const ACTUALIZAR_USUARIO = "actuañizarUsuario";
// mutation types
export const SET_USUARIOS = "setUsuarios";
export const SET_USUARIO = "setUsuario";

const state = {
    usuarios: [],
    usuario:[],
}

const getters = {
    obtenerUsuarios(state) {
      return state.usuarios;
    },
}

const actions = {
    async [OBTENER_USUARIOS](context, estadoId) {
        /*
        * Si el estado es null va a traer a todos los usuarios, de lo contrario va a traer los usuarios por estado
        *
        */
        let endpoint = 'api/Usuarios';
        if(estadoId){
            endpoint = `api/Usuarios/GetUsuariosActivos/${estadoId}`
        }
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_USUARIOS, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    },
    async [OBTENER_USUARIO](context, id){
        
        return new Promise(resolve => {
            ApiService.query(`apiconsume/edit/${id}?endpoint=api/Usuarios/`)
                .then(({ data }) => {
                    context.commit(SET_USUARIO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    },
    async [REGISTRAR_USUARIO](context, datosUsuario){
        return new Promise(resolve => {
            ApiService.post(`apiconsume/create?endpoint=api/Usuarios`, datosUsuario)
                .then(({ data }) => {
                    context.commit(SET_USUARIO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });   
    },

    async [ACTUALIZAR_USUARIO](context, datosUsuario){
        let id = datosUsuario.id;
        
        return new Promise(resolve => {
            ApiService.post(`apiconsume/update/${id}?endpoint=api/Usuarios/UpdateUsuario/`, datosUsuario)
                .then(({ data }) => {
                    context.commit(SET_USUARIO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    }
  }
const mutations = {
    [SET_USUARIOS](state, data) {
        state.usuarios = data;
    },

    [SET_USUARIO](state, data) {
        state.usuario = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}