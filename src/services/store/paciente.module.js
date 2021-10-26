/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const OBTENER_PACIENTES = "obtenerPacientes";
export const OBTENER_PACIENTE = "obtenerPaciente";
export const REGISTRAR_PACIENTE = "registrarPaciente";
export const ACTUALIZAR_PACIENTE = "actualizarPaciente";
// mutation types
export const SET_PACIENTES = "setPacientes";
export const SET_PACIENTE = "setPaciente";

const state = {
    pacientes: [],
    paciente: [],
}

const getters = {
    obtenerPacientes(state) {
      return state.pacientes;
    },
}

const actions = {
    async [OBTENER_PACIENTES](context, estadoId) {
        /*
        * Si el estado es null va a traer a todos los usuarios, de lo contrario va a traer los usuarios por estado
        *
        */
        let endpoint = 'api/Paciente';
        if(estadoId){
            endpoint = `api/Paciente/GetPacientesActivos/${estadoId}`
        }
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_PACIENTES, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    },
    async [OBTENER_PACIENTE](context, id){
        
        return new Promise(resolve => {
            ApiService.query(`apiconsume/edit/${id}?endpoint=api/Paciente/`)
                .then(({ data }) => {
                    context.commit(SET_PACIENTE, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    },
    async [REGISTRAR_PACIENTE](context, datosPaciente){
        return new Promise(resolve => {
            ApiService.post(`apiconsume/create?endpoint=api/Paciente`, datosPaciente)
                .then(({ data }) => {
                    context.commit(SET_PACIENTE, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });   
    },

    async [ACTUALIZAR_PACIENTE](context, datosPaciente){
        let id = datosPaciente.id;
        
        return new Promise(resolve => {
            ApiService.post(`apiconsume/update/${id}?endpoint=api/Paciente/UpdatePaciente/`, datosPaciente)
                .then(({ data }) => {
                    context.commit(SET_PACIENTE, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    }
  }
const mutations = {
    [SET_PACIENTES](state, data) {
        state.pacientes = data;
    },

    [SET_PACIENTE](state, data) {
        state.paciente = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}