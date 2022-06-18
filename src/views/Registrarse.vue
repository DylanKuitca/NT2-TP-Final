<template>

  <section class="src-views-registrarse-vue">
    <br>
    <br>
    <br>
      <div class="container d-flex justify-content-center">
      <div class="jumbotron text-center">
        <h1>Pagina de Registro</h1>
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
         
        </vue-form>

      </div>
    </div>
  </section>

</template>

<script>

  export default  {
    name: 'src-views-registrarse-vue',
    props: [],
    mounted () {

    },
    data() {
      return {
        formState: {},
        ClaveCheck:'',
        formData: this.getInitialData(),
      };
  },
  methods: {
    getInitialData() {
        return {
          nombre:'',
          email:'',
          password:'',
        }
      },
      registrar() {
        this.$store.dispatch('POST_NEW_USER',this.formData)
        this.formData = this.getInitialData()
        this.formState._reset()
      },
      clavesDistintas() {
        return this.formData.password!=this.ClaveCheck
      }

  },
    computed: {

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
