<template>
  <div class="contenedor">

    <h1>Pantalla para Mostrar Todos</h1>

    

    <table v-if="estudiantes.length">

      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Fecha Nacimiento</th>
          <th>Provincia</th>
          <th>Genero</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="e in estudiantes" :key="e.id">

          <td>{{ e.id }}</td>
          <td>{{ e.nombre }}</td>
          <td>{{ e.apellido }}</td>

          <td>{{ e.fechaNacimiento }}</td>

          <td>{{ e.provincia }}</td>
          <td>{{ e.genero }}</td>

        </tr>
      </tbody>

    </table>

    <p v-else>No hay datos para mostrar</p>

  </div>
</template>

<script>
import { consultarTodoFacade } from "../clients/MatriculaClient.js";

export default {

  data() {
    return {
      estudiantes: []
    };
  },

  mounted() {
    this.mostrarTodosEstudiantes();
  },

  methods: {

    async mostrarTodosEstudiantes() {
      try {

        this.estudiantes = await consultarTodoFacade();

      } catch (error) {

        console.error(error);

      }
    },

    
  }
};
</script>

<style scoped>

.contenedor {
  width: 90%;
  margin: auto;
}

button {
  margin-bottom: 15px;
  padding: 6px 10px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background: #f3f3f3;
}

tr:hover {
  background: #f9f9f9;
}

</style>
