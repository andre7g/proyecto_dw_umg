/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const OBTENER_FUNCIONES_MFEDICAMENTO = "obtenerFuncionesMedicamento";
// mutation types
export const SET_FUNCIONES_MFEDICAMENTO = "setFuncionesMedicamento";
export const SET_FUNCION_MFEDICAMENTO = "setFuncionMedicamento";

const state = {
    funcionesMedicamento: [],
    funcionMedicamento:[],
}

const getters = {
    obtenerfuncionesMedicamento(state) {
      return state.funcionesMedicamento;
    },
}

const actions = {
    async [OBTENER_FUNCIONES_MFEDICAMENTO](context, estadoId) {
        /*
        * Si el estado es null va a traer a todos los usuarios, de lo contrario va a traer los usuarios por estado
        *
        */
        let endpoint = 'api/Funcion_Medicamento';
        if(estadoId){
            endpoint = `api/Funcion_Medicamento/GetFunciones_MedicamentoActivas/${estadoId}`
        }
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_FUNCIONES_MFEDICAMENTO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    }
  }
const mutations = {
    [SET_FUNCIONES_MFEDICAMENTO](state, data) {
        state.funcionesMedicamento = data;
    },

    [SET_FUNCION_MFEDICAMENTO](state, data) {
        state.funcionMedicamento = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}