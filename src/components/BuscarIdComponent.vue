<template>
  <div class="contenedor">

    <h1>Buscar Estudiante por ID</h1>

    <div class="busqueda">

      <input
        type="number"
        v-model="idEstudiante"
        placeholder="Ingrese ID"
      >

      <button @click="consultarPorId">
        Buscar
      </button>

    </div>


    <table v-if="estudiante">

      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Fecha Nacimiento</th>
          <th>Provincia</th>
          <th>Género</th>
        </tr>
      </thead>

      <tbody>
        <tr>

          <td>{{ estudiante.id }}</td>
          <td>{{ estudiante.nombre }}</td>
          <td>{{ estudiante.apellido }}</td>

          <td>{{ formatearFecha(estudiante.fechaNacimiento) }}</td>

          <td>{{ estudiante.provincia }}</td>
          <td>{{ estudiante.genero }}</td>

        </tr>
      </tbody>

    </table>

    <p v-if="mensaje" class="mensaje">
      {{ mensaje }}
    </p>

  </div>
</template>

<script>
import { consultarIdFacade } from "../clients/MatriculaClient.js";
import { obtenerTokenFacade } from "../clients/AuthClient.js";
export default {

  data() {
    return {
      idEstudiante: "",
      estudiante: null,
      mensaje: "",
      token:null,
    };
  },

  async mounted() {
    // Apenas se carga el componente, obtenemos el token automáticamente
    try {
      this.token = await obtenerTokenFacade();
      console.log("Autenticación automática exitosa");
    } catch (error) {
      this.mensaje = "Error de autenticación inicial";
    }
  },

  methods: {

    async consultarPorId() {
      if(this.token){
        if (!this.idEstudiante) {
        this.mensaje = "Ingrese un ID primero";
        return;
      }

      try {

        this.estudiante =
          await consultarIdFacade(this.idEstudiante, this.token);

        this.mensaje = "";

      } catch (error) {

        console.error(error);

        this.estudiante = null;
        this.mensaje = "Estudiante no encontrado";
      }
      }
      
    },

    formatearFecha(fecha) {
      if (!fecha) return "";

      return fecha.replace("T", " ").substring(0, 19);
    }
  }
};
</script>

<style scoped>

.contenedor {
  max-width: 700px;
  margin: 40px auto;
  text-align: center;
}

.busqueda {
  margin-bottom: 20px;
}

.busqueda input {
  padding: 7px;
  width: 150px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.busqueda button {
  margin-left: 10px;
  padding: 7px 12px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.busqueda button:hover {
  background: #369870;
}

/* Tabla */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background: #f3f3f3;
}

.mensaje {
  margin-top: 15px;
  color: #c62828;
  font-weight: bold;
}

</style>
