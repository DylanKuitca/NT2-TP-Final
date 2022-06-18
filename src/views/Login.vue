<template>

  <section class="src-views-login-vue">
    <br>
    <br>
    <br>
    <div class="container d-flex justify-content-center">
      <div class="jumbotron text-center">
        <h1>Pagina de Ingreso  <font-awesome-icon icon="fa-solid fa-gears" /></h1>
       
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

          <button class="btn btn-primary mt-3 mb-3 mr-3" :disabled="formState.$invalid" type="login()">Login</button>
         
        </vue-form>

      </div>
    </div>
  </section>

</template>

<script>
export default {
  name: "src-views-login-vue",
  props: [],
  mounted() {

  },
  data() {
    return {
      formState: {},
      formData: this.getInitialData(),
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
        console.log('Email: '+ this.formData.Clave);
      }
  },
  computed: {

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
