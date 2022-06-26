<template>

  <section class="src-views-registrarse-vue">
    <br>
    <br>
    <br>
      <div class="container d-flex justify-content-center">
      <div class="jumbotron text-center">
        <h1>Pagina de Registro<span class="fa fa-pen"></span></h1>
        <br>
        <vue-form :state="formState" @submit.prevent="registrar()">

            <validate tag="div">
            <label for="nombre"></label>
            <input
            id="nombre"
            type="text" 
            v-model.trim="formData.nombre" 
            required 
            class="form-control"
            name="nombre" 
            cant-caracteres
            no-espacios
            placeholder="Nombre y Apellido"
            />
      
            <field-messages name="nombre" show="$dirty">
              <div class="alert alert-success mt-1">Nombre OK!</div>
              <div slot="required" class="alert alert-danger mt-1">Nombre es un campo requerido</div>
               <div class="alert alert-warning mt-1" slot="cant-caracteres">El nombre debe estar entre 3 y 15 caractes</div>
            </field-messages>

          </validate>
            <validate tag="div">
            <label for="Mail"></label>
            <input
            id="mail"
            type="email" 
            v-model.trim="formData.email" 
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
            v-model.trim="formData.password" 
            required 
            class="form-control"
            name="clave" 
            cant-caracteres
            no-espacios
            placeholder="Ingrese la clave deseada" 
            />
      
            <field-messages name="clave" show="$dirty">
              <div class="alert alert-success mt-1">Clave OK!</div>
              <div slot="required" class="alert alert-danger mt-1">La clave es un campo requerido</div>
               <div class="alert alert-warning mt-1" slot="cant-caracteres">El clave debe estar entre 3 y 15 caractes</div>
            </field-messages>
          </validate>

           <validate tag="div">
            <label for="claveCheck"></label>
            <input
            id="claveCheck"
            type="password" 
            v-model.trim="ClaveCheck" 
            required 
            class="form-control"
            name="claveCheck" 
            cant-caracteres
            no-espacios
            placeholder="Vuelva a ingresar la clave" 
            />
      
            <field-messages name="claveCheck" show="$dirty">
              <div slot="required" class="alert alert-danger mt-1">La clave es un campo requerido</div>
              <div class="alert alert-warning mt-1" slot="cant-caracteres">El clave debe estar entre 3 y 15 caractes</div>
              <div v-if="this.clavesDistintas()" class="alert alert-danger mt-3">LAS CLAVES NO SON IGUALES</div>
              <div v-if="!this.clavesDistintas()" class="alert alert-success mt-3">MISMA CLAVE</div>
            </field-messages>
          </validate>

          <button class="btn btn-success mt-3 mb-3 mr-3" :disabled="formState.$invalid" @click="registrar">Registrarse</button>
          <div class="errorMessage alert alert-danger" v-show="mostrarError">Error, ya existe un usuario con ese E-mail</div>
         
        </vue-form>
        {{mostrarUsuarios}}
      </div>
    </div>
  </section>

</template>

<script>

// import axios from 'axios';

  export default  {
    name: 'src-views-registrarse-vue',
    props: [],
    mounted () {
      this.cargarUsuarios()
    },
    data() {
      return {
        formState: {},
        ClaveCheck:'',
        formData: this.getInitialData(),
        mostrarError: false
      };
  },
  methods: {
    getInitialData() {
        return {
          // image: this.getProfileImage(),
          nombre:'',
          email:'',
          password:'',
          tareas: []
        }
      },
     async registrar() {
        this.checkearExistente()
        if (this.mostrarError == false) {
        await this.$store.dispatch('POST_NEW_USER',this.formData)
        this.$store.dispatch('setMail', this.formData.email)
        console.log('entro aca');
        this.ClaveCheck = ''
        this.formData = this.getInitialData()
        this.formState._reset()
        this.$router.push( { name: 'ToDoApp' } )
        } 
      },
      clavesDistintas() {
        return this.formData.password!=this.ClaveCheck
      },
      async cargarUsuarios() {
      await this.$store.dispatch('GET_PERSONAS')
      
      },
      // async agregarUsuarioAlStore() {
      //   console.log('entro a usuario');
      // await this.$store.dispatch('GET_PERSONAS')
      // console.log('paso el get');
      // for(let i = 0; i < this.mostrarUsuarios; i++) {
      //   console.log(i);
      //       if (this.mostrarUsuarios[i].email == this.formData.email && this.mostrarUsuarios[i].password == this.formData.password) {
      //         this.$store.dispatch('setUsuario', this.mostrarUsuarios[i])
              
      //       }
      //   }
      // },
      checkearExistente() {
        console.log('checkearExistente 1');
        for(let i = 0; i < this.mostrarUsuarios.length; i++) {
          console.log('checkearExistente 2');
            if (this.mostrarUsuarios[i].email == this.formData.email) {
              this.mostrarError = true
              console.log('existente encontrado');
              break
            }
        }
        
      },

    //  async getProfileImage() {
    //     let result = await axios.get('https://randomuser.me/api/')
    //     console.log(result);
    //     let image = result.results.picture.large
    //     return image
    //   }

  },
    computed: {
      mostrarUsuarios() {
        return this.$store.getters.getterUsuarios
      }
    }
}


</script>


<style scoped lang="css">
  .src-views-registrarse-vue {

  }
  .jumbotron {
    background-color: whitesmoke;
    width: 50%; 
    justify-content: center;
  }
</style>
