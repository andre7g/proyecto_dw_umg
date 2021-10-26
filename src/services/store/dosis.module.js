/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const OBTENER_DOSIS = "obtenerDosis";
// mutation types
export const SET_DOSIS = "setDosis";
export const SET_DOSI = "setDosi";

const state = {
    dosis: [],
    dosi:[],
}

const getters = {
    obtenerDosis(state) {
      return state.dosis;
    },
}

const actions = {
    async [OBTENER_DOSIS](context, estadoId) {
        /*
        * Si el estado es null va a traer a todos los usuarios, de lo contrario va a traer los usuarios por estado
        *
        */
        let endpoint = 'api/Dosis';
        if(estadoId){
            endpoint = `api/Dosis/GetDosisActivas/${estadoId}`
        }
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_DOSIS, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    }
  }
const mutations = {
    [SET_DOSIS](state, data) {
        state.dosis = data;
    },

    [SET_DOSI](state, data) {
        state.dosi = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}