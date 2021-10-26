/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const OBTENER_HABITACIONES = "obtenerHabitaciones";
export const ACTUALIZAR_HABITACION = "actualizarHabitacion";
// mutation types
export const SET_HABITACIONES = "setHbitaciones";
export const SET_HABITACION = "setHbitacion";

const state = {
    habitaciones: [],
    habitacion: [],
}

const getters = {
    obtenerHabitaciones(state) {
      return state.habitaciones;
    },
}

const actions = {
    async [OBTENER_HABITACIONES](context) {
        /*
        * Si el estado es null va a traer a todos los usuarios, de lo contrario va a traer los usuarios por estado
        *
        */
        let endpoint = 'api/Habitacion';
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_HABITACIONES, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    },
    async [ACTUALIZAR_HABITACION](context, datosHabitacion){
        let id = datosHabitacion.id;
        
        return new Promise(resolve => {
            ApiService.post(`apiconsume/update/${id}?endpoint=api/Habitacion/UpdateHabitacion/`, datosHabitacion)
                .then(({ data }) => {
                    context.commit(SET_HABITACION, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    }
  }
const mutations = {
    [SET_HABITACIONES](state, data) {
        state.habitaciones = data;
    },

    [SET_HABITACION](state, data) {
        state.habitacion = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}