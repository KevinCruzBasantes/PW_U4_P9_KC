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
      exito: false
    };
  },

  methods: {

    async buscar() {

      if (!this.id) {
        this.mensaje = "Ingrese un ID";
        this.exito = false;
        return;
      }

      try {

        const e = await consultarIdFacade(this.id);

        this.nombre = e.nombre;
        this.apellido = e.apellido;

        this.fechaNacimiento =
          e.fechaNacimiento.substring(0, 16);

        this.provincia = e.provincia;
        this.genero = e.genero;

        this.estudianteCargado = true;

        this.mensaje = "";

      } catch (error) {

        console.error(error);

        this.mensaje = "No encontrado";
        this.exito = false;

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

        await actualizarFacade(this.id, body);

        this.mensaje = "Actualizado correctamente";
        this.exito = true;

      } catch (error) {

        console.error(error);

        this.mensaje = "Error al actualizar";
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
