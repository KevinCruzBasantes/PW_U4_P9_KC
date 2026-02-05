<template>
  <nav>
    <router-link to="/guardar">Guardar</router-link> |
    <router-link to="/mostrarTodo">MostrarTodos</router-link> |
    <router-link to="/buscarId">BuscarId</router-link> |
    <router-link to="/actualizar">Actualizar</router-link> |
    <router-link to="/actualizarParcial">ActualizarParcial</router-link> |
    <router-link to="/eliminar">Eliminar</router-link>
   
  </nav>
  <router-view />
</template>

<style scoped>
nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>