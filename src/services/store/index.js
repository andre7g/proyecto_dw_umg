import Vue from "vue";
import Vuex from "vuex";
import breadcrumbs from "./breadcrumbs.module";
import auth from "./auth.module";
import config from "./config.module";

import usuario from "./usuario.module";
import personaladministrativo from "./personaladministrativo.module";
import clinica from "./clinica.module";
import tipopersonal from "./tipopersonal.module";
import profecion from "./profecion.module";
import rol from "./rol.module";
import usuariorol from "./usuariorol.module";
import paciente from "./paciente.module";
import producto from "./producto.module";
import viaadministracion from "./viaadministracion.module";
import marca from "./marca.module";
import dosis from "./dosis.module";
import presentacion from "./presentacion.module";
import habitacion from "./habitacion.module";
import habitacionpaciente from "./habitacionpaciente.module";
import funcionmedicamento from "./funcionmedicamento.module";
import cargararchivo from "./cargararchivo.module";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    config,
    breadcrumbs,
    usuario,
    personaladministrativo,
    clinica,
    tipopersonal,
    profecion,
    rol,
    usuariorol,
    paciente,
    producto,
    viaadministracion,
    marca,
    dosis,
    presentacion,
    habitacion,
    habitacionpaciente,
    funcionmedicamento,
    cargararchivo
  }
});
