<template>
  <div class="contenedor">

    <h1>Actualizar Estudiante</h1>

    <div class="busqueda">

      <input
        type="number"
        v-model="id"
        placeholder="Ingrese ID"
      >

      <button @click="buscar">
        Buscar
      </button>

    </div>

    <form
      v-if="estudianteCargado"
      class="formulario"
      @submit.prevent="actualizar"
    >

      <label>Nombre</label>
      <input type="text" v-model="nombre" required>

      <label>Apellido</label>
      <input type="text" v-model="apellido" required>

      <label>Fecha Nacimiento</label>
      <input
        type="datetime-local"
        v-model="fechaNacimiento"
        required
      >

      <label>Provincia</label>
      <input type="text" v-model="provincia" required>

      <label>Género</label>
      <input type="text" v-model="genero" required>

      <button type="submit">
        Actualizar
      </button>

    </form>

    <p
      v-if="mensaje"
      :class="['mensaje', exito ? 'ok' : 'error']"
    >
      {{ mensaje }}
    </p>

  </div>
</template>

<script>
import {
  consultarIdFacade,
  actualizarFacade
} from "../clients/MatriculaClient.js";

import { obtenerTokenFacade } from "../clients/AuthClient.js"; // Importamos el nuevo cliente
export default {

  data() {
    return {

      id: "",

      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      provincia: "",
      genero: "",

      estudianteCargado: false,

      mensaje: "",
      exito: false,
      token: null,
    };
  },
  async mounted() {
    // Apenas se carga el componente, obtenemos el token automáticamente
    try {
      this.token = await obtenerTokenFacade();
      console.log("Autenticación automática exitosa");
    } catch (error) {
      this.mensaje = "Error de autenticación inicial";
      this.exito = false;
    }
  },
  methods: {

    async buscar() {
      if (!this.id || !this.token) { // Validamos que tengamos el token
        this.mensaje = "Falta ID o Autenticación";
        return;
      }

      try {
        // Pasamos el token guardado en data()
        const e = await consultarIdFacade(this.id, this.token);

        this.nombre = e.nombre;
        this.apellido = e.apellido;
        this.fechaNacimiento = e.fechaNacimiento.substring(0, 16);
        this.provincia = e.provincia;
        this.genero = e.genero;
        this.estudianteCargado = true;
        this.mensaje = "";
      } catch (error) {
        this.mensaje = "Estudiante no encontrado";
        this.estudianteCargado = false;
      }
    },

    async actualizar() {
      const body = {
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: this.fechaNacimiento,
        provincia: this.provincia,
        genero: this.genero
      };

      try {
        // Pasamos el token guardado en data()
        await actualizarFacade(this.id, body, this.token);
        this.mensaje = "Actualizado correctamente";
        this.exito = true;
      } catch (error) {
        this.mensaje = "Error al actualizar (Token expirado o inválido)";
        this.exito = false;
      }
    },

  }
};
</script>

<style scoped>

.contenedor {
  max-width: 450px;
  margin: 40px auto;
}

.busqueda {
  text-align: center;
  margin-bottom: 15px;
}

.busqueda input {
  padding: 6px;
  width: 120px;
}

.busqueda button {
  padding: 6px 10px;
  margin-left: 5px;
}

.formulario {
  display: flex;
  flex-direction: column;
}

.formulario label {
  margin-top: 10px;
}

.formulario input {
  padding: 6px;
}

.formulario button {
  margin-top: 15px;
  background: #42b983;
  color: white;
  border: none;
  padding: 7px;
  border-radius: 4px;
}

.mensaje {
  text-align: center;
  margin-top: 15px;
  font-weight: bold;
}

.ok {
  color: green;
}

.error {
  color: red;
}
</style>
