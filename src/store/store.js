import Vue from 'vue'
import Vuex from 'vuex'

import cartsModules from './carts'

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        cartsModules,

    }





})