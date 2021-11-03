/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const OBTENER_HABITACIONES_PACIENTE = "obtenerHabitacionesPaciente";
export const OBTENER_HABITACION_PACIENTE = "obtenerHabitacionPaciente";
export const REGISTRAR_HABITACION_PACIENTE = "registrarHabitacionPaciente";
export const ACTUALIZAR_HABITACION_PACIENTE = "actualizarHabitacionPaciente";
// mutation types
export const SET_HABITACIONES_PACIENTE = "setHabitacionesPaciente";
export const SET_HABITACION_PACIENTE = "setHabitacionPaciente";

const state = {
    habitacionesPaciente: [],
    habitacionPaciente: [],
}

const getters = {
    obtenrHabitacionesPaciente(state) {
      return state.habitacionesPaciente;
    },
}

const actions = {
    async [OBTENER_HABITACIONES_PACIENTE](context, habitacion_Id) {
        /*
        * Si el estado es null va a traer a todos los usuarios, de lo contrario va a traer los usuarios por estado
        *
        */
        let endpoint = 'api/Habitacion_Paciente';
        if(habitacion_Id){
            endpoint = `api/Habitacion_Paciente/GetHabitacion_PacienteByHabitacion/${habitacion_Id}`
        }
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_HABITACIONES_PACIENTE, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    },
    async [OBTENER_HABITACION_PACIENTE](context, id){
        
        return new Promise(resolve => {
            ApiService.query(`apiconsume/edit/${id}?endpoint=api/Habitacion_Paciente/`)
                .then(({ data }) => {
                    context.commit(SET_HABITACION_PACIENTE, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    },
    async [REGISTRAR_HABITACION_PACIENTE](context, datos){
        return new Promise(resolve => {
            ApiService.post(`apiconsume/create?endpoint=api/Habitacion_Paciente`, datos)
                .then(({ data }) => {
                    context.commit(SET_HABITACION_PACIENTE, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });   
    },

    async [ACTUALIZAR_HABITACION_PACIENTE](context, datos){
        let id = datos.id;
        
        return new Promise(resolve => {
            ApiService.post(`apiconsume/update/${id}?endpoint=api/Habitacion_Paciente/UpdateHabitacion/`, datos)
                .then(({ data }) => {
                    context.commit(SET_HABITACION_PACIENTE, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    }
  }
const mutations = {
    [SET_HABITACIONES_PACIENTE](state, data) {
        state.habitacionesPaciente = data;
    },

    [SET_HABITACION_PACIENTE](state, data) {
        state.habitacionPaciente = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}