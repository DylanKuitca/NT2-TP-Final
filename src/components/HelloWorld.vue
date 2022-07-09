<template>
  <div class="hello">
    <h1>Trabajo Practico Final NT2</h1>
    <hr>
    <p class="text-center">{{returnText().text1}}</p>
    <p class="text-center">{{returnText().text2}}</p>
    <p class="text-center">{{returnText().text3}}</p>
<!-- 
    <div class="badge badge-primary text-wrap mr-3" style="width: 6rem;">
      Boton de INGRESO
    </div>
     <div class="badge badge-success text-wrap mr-3" style="width: 6rem;">
      Boton de REGISTRO
    </div> -->
 
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() { 
    return {
    }
  },
  
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
