<template>
  <section class="src-components-to-do-app">
    <div class="container">
      <h2 class="text-center mt-5">Tareas Pendientes</h2>

      <div class="d-flex">
        <input v-model="tarea" type="text" placeholder="Ingresar Tarea" class="form-control" />
        <button @click="agregarTarea()" class="btn btn-warning rounded 0">ENVIAR</button>
      </div>
      <br>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Index</th>
            <th scope="col">Tarea</th>
            <th scope="col">Estado</th>
            <th scope="col" class="text-center">#</th>
            <th scope="col" class="text-center">#</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(tarea, index) in tareas" :key="index">
            <td>{{index + 1}}</td>
            <td>
              <span :class="{'TareaTerminada': tarea.estado === 'terminada'}">
              {{tarea.nombre}}
              </span>
            </td> 
            
            <td>
              <span @click="cambiarEstado(index)" class="pointer" :class="cambiarColorEstado(tarea.estado)">
                {{tarea.estado}}
              </span>
            </td>
            <td>
              <div class="text text-center" @click="editarTarea(index)">
                <span class="fa fa-pen"></span>
              </div>
            </td>
            <td>
              <div class="text text-center" @click="removerTarea(index)">
                <span class="fa fa-trash"></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </section>
</template>

<script>
export default {
  name: "src-components-to-do-app",
  props: [],
  mounted() {},
  data() {
    return {
      tarea:'',
      editTarea: null,
      colorEstados:['text-danger','text-warning','text-success'],
      estados:['pendiente','en-progreso','terminada'],
      tareas:[
        {nombre: 'Estudiar NT2', estado: 'en-progreso'},
        {nombre: 'Dormir', estado: 'pendiente'},
        {nombre: 'Tomar Agua', estado: 'pendiente'},
        {nombre: 'ganas de vivir', estado: 'terminada'}
      ]
    };
  },
  methods: {
    agregarTarea() {
      if (this.tarea.length > 0) {
        if (this.editTarea === null) {
           this.tareas.push({
              nombre: this.tarea,
              estado: 'to-do'
            })
        } else {
          this.tareas[this.editTarea].nombre = this.tarea
          this.editTarea = null
        }
           
      }
      this.tarea=''
    },
    removerTarea(index) {
      this.tareas.splice(index,1)
    },
    editarTarea(index){
      this.tarea = this.tareas[index].nombre
      this.editTarea = index
    },
    cambiarEstado(index) {
     let nuevoIndice = this.estados.indexOf(this.tareas[index].estado)
     console.log(nuevoIndice);
      if (++nuevoIndice > 2) {
        nuevoIndice = 0 
      } 
      this.tareas[index].estado = this.estados[nuevoIndice]
    },
    cambiarColorEstado(estado) {
      let estilo = 'text-danger'
      if (estado == 'en-progreso') {
        estilo = 'text-warning'
      } if (estado == 'terminada') {
        estilo = 'text-success'
      }
      return estilo
    }
  },
  computed: {},
};
</script>

<style scoped lang="css">
.src-components-to-do-app {
}
.pointer {
  cursor: pointer;
}

.TareaTerminada {
  text-decoration: line-through;
}
</style>
