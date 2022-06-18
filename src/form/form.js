import Vue from 'vue'
import vueForm from 'vue-form'

var options = { 
    validators: {
        'no-espacios': function (params) {
            return !params.includes(' ')
        }, 
        'cant-caracteres': function(value) {
            return value.length <= 15 && value.length >= 3
        }, 

    }
}

Vue.use(vueForm,options)