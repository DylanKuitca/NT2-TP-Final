import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url:'https://6286d6fae9494df61b2e1214.mockapi.io/api/usuarios',
    usuario:''
  },
  getters: {

  },
  actions: {
    POST_NEW_USER({commit}, nuevoUsuario){
      console.log('action -> postPersona',nuevoUsuario);
      commit('POST',nuevoUsuario)
    }
  
  },
  mutations: {
    async POST(state, nuevoUsuario) {
      try {
          let { resp } = await axios.post(state.url,nuevoUsuario)
          console.log(resp.data);
        } catch (err) {
          console.error(err);
        }
    },
  },
 
  modules: {
  
  }

})
