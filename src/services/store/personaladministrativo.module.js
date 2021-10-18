/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const OBTENER_EMPLEADOS = "obtenerEmpleados";
export const OBTENER_EMPLEADO = "obtenerEmpleado";
export const REGISTRAR_EMPLEADO = "registrarEmpleado";
export const ACTUALIZAR_EMPLEADO = "actuañizarEmpleado";
// mutation types
export const SET_EMPLEADOS = "setEmpleados";
export const SET_EMPLEADO = "setCEmpleado";

const state = {
    empleados: [],
    empleado:[],
}

const getters = {
    obtenerEmpleados(state) {
      return state.empleados;
    },
}

const actions = {
    async [OBTENER_EMPLEADOS](context, estadoId) {
        /*
        * Si el estado es null va a traer a todos los usuarios, de lo contrario va a traer los usuarios por estado
        *
        */
        let endpoint = 'api/Personal_Administrativo';
        if(estadoId){
            endpoint = `api/Personal_Administrativo/GetPersonal_AdministrativoActivos/${estadoId}`
        }
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_EMPLEADOS, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    },
    async [OBTENER_EMPLEADO](context, id){
        
        return new Promise(resolve => {
            ApiService.query(`apiconsume/edit/${id}?endpoint=api/Personal_Administrativo/`)
                .then(({ data }) => {
                    context.commit(SET_EMPLEADO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    },
    async [REGISTRAR_EMPLEADO](context, datosEmpleado){
        return new Promise(resolve => {
            ApiService.post(`apiconsume/create?endpoint=api/Personal_Administrativo`, datosEmpleado)
                .then(({ data }) => {
                    context.commit(SET_EMPLEADO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });   
    },

    async [ACTUALIZAR_EMPLEADO](context, datosEmpleado){
        let id = datosEmpleado.id;
        
        return new Promise(resolve => {
            ApiService.post(`apiconsume/update/${id}?endpoint=api/Personal_Administrativo/UpdatePersonal_Administrativo/`, datosEmpleado)
                .then(({ data }) => {
                    context.commit(SET_EMPLEADO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    }
  }
const mutations = {
    [SET_EMPLEADOS](state, data) {
        state.empleados = data;
    },

    [SET_EMPLEADO](state, data) {
        state.empleado = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}