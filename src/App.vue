<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/about">About</router-link>
          <router-link class="nav-link" v-show="this.$store.state.hasLoggedUser" to="/ToDoApp">Lista de Tareas</router-link>
        </div>
      </div>

      <router-link class="btn btn-primary my-2 my-sm-0" to="/login">Ingresar</router-link>
      <form class="form-inline my-2 my-lg-0">
        <router-link class="btn btn-outline-success my-2 my-sm-0" type="submit" to="/registrarse">Registrarse</router-link>
      </form>
    </nav>

    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
