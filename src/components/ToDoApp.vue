<template>
  <section class="src-components-to-do-app">
    <div class="container">
      <h2 class="text-center mt-5">Tareas Pendientes</h2>

      <div class="d-flex">
        <input
          v-model="t"
          type="text"
          placeholder="Ingresar Tarea"
          class="form-control"
        />
        <button @click="agregarTarea()" class="btn btn-warning rounded 0">
          ENVIAR
        </button>
      </div>
      <br />
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
            <td>{{ index + 1 }}</td>
            <td>
              <span :class="{ TareaTerminada: tarea.estado === 'terminada' }">
                {{ tarea.nombre }}
              </span>
            </td>

            <td>
              <span
                @click="cambiarEstado(index)"
                class="pointer"
                :class="cambiarColorEstado(tarea.estado)"
              >
                {{ tarea.estado }}
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

      <div class="container mt-1">
        <div class="jumbotron">
          <h3>Estado {{ calcularTareas.porcentaje }}% <br /></h3>
          <div class="media border p-3">
            <img
              src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/5_avatar-256.png"
              alt="Pepito Gomez"
              class="mr-3 mt-3 rounded-circle"
              style="width: 60px"
            />
            <div class="media-body">
              <h4>
                {{ this.$store.state.usuarioActual.nombre }}
                <small
                  ><i>{{ getFecha() }}</i></small
                >
              </h4>
              <p>
                El total de tareas: {{ calcularTareas.total }} <br />
                Terminadas: {{ calcularTareas.cantTerminadas }} <br />
                Pendientes: {{ calcularTareas.cantPendientes }} <br />
                En Progreso: {{ calcularTareas.cantEnProgreso }} <br />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

const URL = "https://6286d6fae9494df61b2e1214.mockapi.io/api/usuarios/";

export default {
  name: "src-components-to-do-app",
  props: [],
  mounted() {
    // this.cargarData()
    this.loadInfo()
  },
  data() {
    return {
      t: "",
      editTarea: null,
      colorEstados: ["text-danger", "text-warning", "text-success"],
      estados: ["pendiente", "en-progreso", "terminada"],
      tareas: this.$store.state.usuarioActual.tareas,
    };
  },
  methods: {
    async loadInfo() {
      await this.cargarUsuarios();
      await this.agregarUsuarioActual()
      await this.cargarTareas();
    },
    async cargarUsuarios() {
      await this.$store.dispatch("GET_PERSONAS");
    },
    agregarUsuarioActual() {

      for (let index = 0; index < this.$store.state.usuarios.length; index++) {
        if (this.this.$store.state.usuarios[index].email == this.$store.state.mailUsuario) {
          const user = this.$store.state.usuarios[index]
          this.$store.dispatch('setUsuario', user)
        }

      }
    },
    agregarTarea() {
      // if (this.tarea.length > 0) {
      //   if (this.editTarea === null) {
      //     this.tareas.push({
      //       nombre: this.tarea,
      //       estado: "to-do",
      //     });
      //   } else {
      //     this.tareas[this.editTarea].nombre = this.tarea;
      //     this.editTarea = null;
      //   }
      // }
      // this.tarea = "";
      console.log(URL + this.$store.state.usuarioActual.id);
      this.$store.state.usuarioActual.tareas.push({
        nombre: this.t,
        estado: "pendiente",
      });
      axios.put(
        URL + this.$store.state.usuarioActual.id,
        this.$store.state.usuarioActual
      );
    },
    // async cargarData() {
    //   let call = await axios.get(URL)
    //   let usuarios = call.data
    //   console.log(typeof usuarios, usuarios.length);
    //   let encontrado = false
    //   for(let i = 0; i < usuarios.length && encontrado == false ; i++) {
    //     if (usuarios[i].email == this.$store.state.usuarioActual.email) {
    //       console.log(usuarios[i].email);
    //       this.tareas = usuarios[i].tareas
    //       this.$store.state.usuarioActual.id = usuarios[i].id
    //       encontrado = true
    //     }
    //   }
    //   this.tareas  = axios.get(URL + this.$store.state.usuarioActual.id).tareas
    // },
    removerTarea(index) {
      this.tareas.splice(index, 1);
    },
    editarTarea(index) {
      this.tareas[index].nombre = this.t 
      
    },
    cambiarEstado(index) {
      let nuevoIndice = this.estados.indexOf(this.tareas[index].estado);
      console.log(nuevoIndice);
      if (++nuevoIndice > 2) {
        nuevoIndice = 0;
      }
      this.tareas[index].estado = this.estados[nuevoIndice];
    },
    cambiarColorEstado(estado) {
      let estilo = "text-danger";
      if (estado == "en-progreso") {
        estilo = "text-warning";
      }
      if (estado == "terminada") {
        estilo = "text-success";
      }
      return estilo;
    },
    getFecha() {
      const hoy = new Date(Date.now());
      return hoy.toString();
    },
    cargarTareas() {
      this.tareas = this.$store.state.usuarioActual.tareas;
    },
  },
  computed: {
     mostrarUsuarios() {
        return this.$store.getters.getterUsuarios
      },
    calcularTareas() {
      let total = this.tareas.length;
      let cantTerminadas = this.tareas.filter(
        (t) => t.estado == "terminada"
      ).length;
      let cantPendientes = this.tareas.filter(
        (t) => t.estado == "pendiente"
      ).length;
      let cantEnProgreso = this.tareas.filter(
        (t) => t.estado == "en-progreso"
      ).length;

      return {
        total,
        cantTerminadas,
        cantPendientes,
        cantEnProgreso,
        porcentaje: (cantTerminadas * 100) / total,
      };
    },
  },
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
