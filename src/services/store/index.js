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
    usuariorol
  }
});
