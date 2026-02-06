<template>
  <nav>
    <router-link to="/guardar">Guardar</router-link> |
    <router-link to="/mostrarTodo">MostrarTodos</router-link> |
    <router-link to="/buscarId">BuscarId</router-link> |
    <router-link to="/actualizar">Actualizar</router-link> |
    <router-link to="/actualizarParcial">ActualizarParcial</router-link> |
    <router-link to="/eliminar">Eliminar</router-link> |
    
    <button @click="salir" class="btn-salir">Cerrar Sesión</button>
  </nav>
  <router-view />
</template>

<script>
import { cerrarSesionFacade } from "./clients/AuthClient.js"; 

export default {
  methods: {
    salir() {
      
      cerrarSesionFacade(); // Borra localStorage
    this.$router.push({ name: 'login' }); // Redirige inmediatamente
      
    }
  }
}
</script>

<style scoped>
nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 5px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.btn-salir {
  margin-left: 15px;
  background-color: #ff4757;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}


</style>