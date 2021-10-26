/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const OBTENER_PRESENTACIONES = "obtenerPresentaciones";
// mutation types
export const SET_PRESENTACIONES = "setPresentaciones";
export const SET_PRESENTACION = "setPresentacion";

const state = {
    presentaciones: [],
    presentacion:[],
}

const getters = {
    obtenerPresentaciones(state) {
      return state.presentaciones;
    },
}

const actions = {
    async [OBTENER_PRESENTACIONES](context, estadoId) {
        /*
        * Si el estado es null va a traer a todos los usuarios, de lo contrario va a traer los usuarios por estado
        *
        */
        let endpoint = 'api/Presentacion';
        if(estadoId){
            endpoint = `api/Presentacion/GetPresentacionesActivas/${estadoId}`
        }
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_PRESENTACIONES, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    }
  }
const mutations = {
    [SET_PRESENTACIONES](state, data) {
        state.presentaciones = data;
    },

    [SET_PRESENTACION](state, data) {
        state.presentacion = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}