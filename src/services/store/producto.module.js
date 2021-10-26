/* eslint-disable */
//import axios from "axios";
import ApiService from "@/services/api.service";
// action types
export const OBTENER_PRODUCTOS = "obtenerProductos";
export const OBTENER_PRODUCTO = "obtenerProducto";
export const REGISTRAR_PRODUCTO = "registrarProducto";
export const ACTUALIZAR_PRODUCTO = "actualizarProducto";
// mutation types
export const SET_PRODUCTOS = "setProductos";
export const SET_PRODUCTO = "setProducto";

const state = {
    productos: [],
    producto: [],
}

const getters = {
    obtenerProductos(state) {
      return state.productos;
    },
}

const actions = {
    async [OBTENER_PRODUCTOS](context, estadoId) {
        /*
        * Si el estado es null va a traer a todos los usuarios, de lo contrario va a traer los usuarios por estado
        *
        */
        let endpoint = 'api/Productos';
        if(estadoId){
            endpoint = `api/Productos/GetProductosActivos/${estadoId}`
        }
        return new Promise(resolve => {
            ApiService.query(`apiconsume/obtener?endpoint=${endpoint}`, '')
                .then(({ data }) => {
                    context.commit(SET_PRODUCTOS, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    },
    async [OBTENER_PRODUCTO](context, id){
        
        return new Promise(resolve => {
            ApiService.query(`apiconsume/edit/${id}?endpoint=api/Productos/`)
                .then(({ data }) => {
                    context.commit(SET_PRODUCTO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    },
    async [REGISTRAR_PRODUCTO](context, datosProducto){
        console.log(datosProducto);
        return new Promise(resolve => {
            ApiService.post(`apiconsume/create?endpoint=api/Productos`, datosProducto)
                .then(({ data }) => {
                    context.commit(SET_PRODUCTO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });   
    },

    async [ACTUALIZAR_PRODUCTO](context, datosProducto){
        let id = datosProducto.id;
        
        return new Promise(resolve => {
            ApiService.post(`apiconsume/update/${id}?endpoint=api/Productos/UpdateProducto/`, datosProducto)
                .then(({ data }) => {
                    context.commit(SET_PRODUCTO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });    
    }
  }
const mutations = {
    [SET_PRODUCTOS](state, data) {
        state.productos = data;
    },

    [SET_PRODUCTO](state, data) {
        state.producto = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}