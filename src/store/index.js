import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const URL = 'https://6286d6fae9494df61b2e1214.mockapi.io/api/usuarios/'

export default new Vuex.Store({
  state: {
    usuarios:[]
  },
  getters: {
    getUsuarios: state => state.usuarios
  },
  actions: {
    async POST_NEW_USER({commit}, nuevoUsuario){
      console.log('action -> postPersona',nuevoUsuario);
      commit('postUsuario',nuevoUsuario)
    },
    async GET_PERSONAS({commit}) {
      let res = await axios.get(URL)
      commit('getUsuarios',res.data)
    }
  
  },
  mutations: {
  
    getUsuarios(state,data){
      state.usuarios = data
      return data
    },
    postUsuario(state,nuevoUsuario) {
      try {
        let { resp } = axios.post(URL,nuevoUsuario)
        state.usuarios = resp
        console.log(resp);
      } catch (error) {
        console.log(error);
      }
    }
  },
 
  modules: {
  
  }

})
