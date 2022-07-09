import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const URL = 'https://6286d6fae9494df61b2e1214.mockapi.io/api/usuarios/'

export default new Vuex.Store({
  state: {
    usuarios:[],
    usuarioActual: {}
  },
  getters: {
    getUsuarios: state => state.usuarios
  },
  actions: {
    async POST_NEW_USER({commit}, nuevoUsuario){
      console.log('action -> postPersona',nuevoUsuario);
      let {resp} = await axios.post(URL, nuevoUsuario)
      console.log("Usuario actual: ",this.usuarioActual);
      commit('postUsuario', resp)
    },
    async GET_PERSONAS({commit}) {
      let res = await axios.get(URL)
      commit('getUsuarios',res.data)
    },

    setUsuario({commit}, usuario) {
      commit('setUsuario', usuario)
    }
  
  },
  mutations: {

    setUsuario(state, usuario) {
      state.usuarioActual = usuario
    },
  
    getUsuarios(state,data){
      state.usuarios = data
      return data
    },
    postUsuario(state,resp) {
        state.usuarios.push(resp)
        console.log("REsp :" + resp);
    }
  },
 
  modules: {
  
  }

})
