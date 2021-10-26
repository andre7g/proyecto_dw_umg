/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const OBTENER_VIAS_ADMINISTRACION = "obtenerViasAdministracion";
// mutation types
export const SET_VIAS_ADMINISTRACION = "setViasAdministracion";
export const SET_VIA_ADMINISTRACION = "setViaAdministracion";

const state = {
    vias: [],
    via:[],
}

const getters = {
    obtenerViasAdministracion(state) {
      return state.vias;
    },
}

const actions = {
    async [OBTENER_VIAS_ADMINISTRACION](context, estadoId) {
        /*
        * Si el estado es null va a traer a todos los usuarios, de lo contrario va a traer los usuarios por estado
        *
        */
        let endpoint = 'api/Via_Administracion_Producto';
        if(estadoId){
            endpoint = `api/Via_Administracion_Producto/GetVias_AdministracionActivas/${estadoId}`
        }
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_VIAS_ADMINISTRACION, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    }
  }
const mutations = {
    [SET_VIAS_ADMINISTRACION](state, data) {
        state.vias = data;
    },

    [SET_VIA_ADMINISTRACION](state, data) {
        state.via = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}