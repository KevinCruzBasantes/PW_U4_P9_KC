<template>
  <div class="contenedor">

    <h1>Eliminar Estudiante</h1>

    <form
      class="formulario"
      @submit.prevent="mostrarConfirmacion"
    >

      <label>ID del Estudiante</label>
      <input
        type="number"
        v-model="id"
        required
      />

      <button
        type="submit"
        class="btn-eliminar"
      >
        Eliminar
      </button>

    </form>

    <div
      v-if="confirmar"
      class="confirmacion"
    >

      <p>
        ¿Está seguro que desea eliminar
        el estudiante con ID {{ id }}?
      </p>

      <div class="botones">

        <button
          class="btn-si"
          @click="confirmarEliminar"
        >
          Sí
        </button>

        <button
          class="btn-no"
          @click="cancelarEliminar"
        >
          No
        </button>

      </div>

    </div>

    <p
      v-if="mensaje"
      :class="['mensaje', exito ? 'ok' : 'error']"
    >
      {{ mensaje }}
    </p>

  </div>
</template>

<script>
import { eliminarFacade } from "../clients/MatriculaClient";

export default {

  data() {
    return {

      id: "",

      confirmar: false,

      mensaje: "",
      exito: false
    };
  },

  methods: {

    mostrarConfirmacion() {

      this.mensaje = "";
      this.exito = false;

      this.confirmar = true;
    },

    async confirmarEliminar() {

      try {

        await eliminarFacade(this.id);

        this.mensaje = "Estudiante eliminado correctamente ";
        this.exito = true;

        this.id = "";
        this.confirmar = false;

      } catch (error) {

        console.error(error);

        this.mensaje = "Error al eliminar el estudiante ";
        this.exito = false;

        this.confirmar = false;
      }
    },

    cancelarEliminar() {

      this.confirmar = false;

      this.mensaje = "Eliminación cancelada";
      this.exito = false;
    }
  }
};
</script>

<style scoped>

.contenedor {
  max-width: 400px;
  margin: 40px auto;
  padding: 25px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
  text-align: center;
}


.formulario {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.formulario label {
  margin-top: 10px;
  font-weight: bold;
}

.formulario input {
  padding: 7px;
  margin-top: 3px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.formulario button {
  margin-top: 15px;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}


.btn-eliminar {
  background: #e53935;
  color: white;
}

.btn-eliminar:hover {
  background: #c62828;
}


.confirmacion {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #f44336;
  border-radius: 6px;
  background: #fff5f5;
}

.confirmacion p {
  font-weight: bold;
  margin-bottom: 10px;
}

.botones {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.btn-si {
  background: #e53935;
  color: white;
  border: none;
  padding: 7px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-si:hover {
  background: #c62828;
}

.btn-no {
  background: #9e9e9e;
  color: white;
  border: none;
  padding: 7px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-no:hover {
  background: #757575;
}


.mensaje {
  margin-top: 15px;
  padding: 8px;
  border-radius: 4px;
  font-weight: bold;
}

.ok {
  background: #e6f7ee;
  color: #2e7d32;
  border: 1px solid #2e7d32;
}

.error {
  background: #fdecea;
  color: #c62828;
  border: 1px solid #c62828;
}

</style>
