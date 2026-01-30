<template>
  <div>
    <h2>Pantalla para Guardar Estudiante</h2>
    <form action="">
        <p>Nombre</p>
        <input type="text" v-model="nombre">
        <p>Apellido</p>
        <input type="text" v-model="apellido">
        <p>FechaNacimiento</p>
        <input type="date" v-model="fechaNacimiento">
    </form>

  </div>
</template>

<script>
export {guardarFacade} from "../clients/MatriculaClient.js";
export default {
   data() {
       return {
           nombre: '',
           apellido: '',
           fechaNacimiento: ''
       }
   },
}
</script>

<style>

</style>