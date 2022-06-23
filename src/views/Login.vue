<template>

  <section class="src-views-login-vue">
    <br>
    <br>
    <br>
    <div class="container d-flex justify-content-center">
      <div class="jumbotron text-center">
        <h1>Pagina de Ingreso</h1>
       <!-- <font-awesome-icon icon="fa-solid fa-gears" /> -->
        <br>
        <vue-form :state="formState" @submit.prevent="login()">

            <validate tag="div">
            <label for="Mail"></label>
            <input
            id="mail"
            type="email" 
            v-model="formData.Mail" 
            required
            class="form-control"
            name="mail"
            placeholder="Ingrese email" 
            />
           
            <field-messages name="mail" show="$dirty">
              <div class="alert alert-success mt-1">mail OK!</div>
              <div slot="required" class="alert alert-danger mt-1">Email es un campo requerido</div>
            </field-messages>
          </validate>
    
          <validate tag="div">
            <label for="clave"></label>
            <input
            id="clave"
            type="password" 
            v-model.trim="formData.Clave" 
            required 
            class="form-control"
            name="clave" 
            cant-caracteres
            no-espacios
            placeholder="Ingrese la clave" 
            />
      
            <field-messages name="clave" show="$dirty">
              <div class="alert alert-success mt-1">Clave OK!</div>
              <div slot="required" class="alert alert-danger mt-1">La clave es un campo requerido</div>
               <div class="alert alert-warning mt-1" slot="cant-caracteres">El clave debe estar entre 3 y 15 caractes</div>
            </field-messages>
          </validate>

          <button class="btn btn-primary mt-3 mb-3 mr-3" :disabled="formState.$invalid" @click="login()" >Login</button>
          <div class="errorMessage alert alert-danger" v-show="mostrarError">Error en usuario y/o contraseña</div>
          <!-- type="login()" -->
         {{mostrarUsuarios}}
        </vue-form>

      </div>
    </div>
  </section>

</template>

<script>

/* import { mapGetters } from 'vuex' */

export default {
  name: "src-views-login-vue",
  props: [],
  mounted() {
     this.$store.dispatch('GET_PERSONAS')
  },
  data() {
    return {
      formState: {},
      formData: this.getInitialData(),
      mostrarError: false
    };
  },
  methods: {
    getInitialData() {
        return {
          Mail:'',
          Clave:'',
        }
      },
      login() {
        console.log('Email: '+ this.formData.Mail);
        console.log('Clave: '+ this.formData.Clave);

        for(let i = 0; i < this.mostrarUsuarios.length; i++) {
          console.log(this.mostrarUsuarios[i].email);
            if (this.mostrarUsuarios[i].email == this.formData.Mail && this.mostrarUsuarios[i].password == this.formData.Clave) {
              this.$store.dispatch('setUsuario', this.mostrarUsuarios[i])
              this.$router.push( { name: 'ToDoApp' } )
            }
        }
        this.mostrarError = true

      },
      mostrar(){
       console.log( {...this.$store.state.usuario});
      }
  },
  computed: {
 
    mostrarUsuarios() {
      return this.$store.state.usuarios
    }
  },
};
</script>

<style scoped lang="css">
.src-views-login-vue {
}

.jumbotron {
    background-color: whitesmoke;
    width: 50%;
    justify-content: center;
  }
</style>
