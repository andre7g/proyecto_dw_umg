/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const OBTENER_MARCAS = "obtenerMarcas";
// mutation types
export const SET_MARCAS = "setMarcas";
export const SET_MARCA = "setMarca";

const state = {
    marcas: [],
    marca:[],
}

const getters = {
    obtenerMarcas(state) {
      return state.marcas;
    },
}

const actions = {
    async [OBTENER_MARCAS](context, estadoId) {
        /*
        * Si el estado es null va a traer a todos los usuarios, de lo contrario va a traer los usuarios por estado
        *
        */
        let endpoint = 'api/Marca';
        if(estadoId){
            endpoint = `api/Marca/GetMarcasActivas/${estadoId}`
        }
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_MARCAS, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    }
  }
const mutations = {
    [SET_MARCAS](state, data) {
        state.marcas = data;
    },

    [SET_MARCA](state, data) {
        state.marca = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}