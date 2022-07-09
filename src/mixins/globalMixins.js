import Vue from "vue";

const miMixinGlobal = {
    methods: {
        returnText() {
            
                
                return {
                    text1 : "El proyecto consiste en una aplicacion que permite tener una lista de tareas asociadas a un estado.",
                    text2 : "Las tareas son modificables y eliminables, al mismo tiempo, la aplicacion nos devuelve cuantas de",
                    text3 : "estas fueron terminadas y cuantas no, permitiendonos llevar un registro de las mismas."
                }
            
        }
    }
}

Vue.mixin(miMixinGlobal)