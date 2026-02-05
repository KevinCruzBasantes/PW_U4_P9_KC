<template>
  <div class="contenedor">
    <h1>Actualizar Parcial Estudiante</h1>

    <form class="formulario" @submit.prevent="actualizarParcial">
      <label>ID del Estudiante</label>
      <input type="number" v-model="id" required />

      <label>Nombre (opcional)</label>
      <input type="text" v-model="nombre" />

      <label>Apellido (opcional)</label>
      <input type="text" v-model="apellido" />

      <label>Provincia (opcional)</label>
      <input type="text" v-model="provincia" />

      <label>Género (opcional)</label>
      <input type="text" v-model="genero" />

      <button type="submit">Actualizar</button>
    </form>

    <p v-if="mensaje" :class="['mensaje', exito ? 'ok' : 'error']">
      {{ mensaje }}
    </p>
  </div>
</template>

<script>
import { actualizarParcialFacade } from "../clients/MatriculaClient";
import { obtenerTokenFacade } from "../clients/AuthClient.js"; 


export default {
  data() {
    return {
      id: "",

      nombre: "",
      apellido: "",
      provincia: "",
      genero: "",

      mensaje: "",
      exito: false,
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
      this.exito = false;
    }
  },
  methods: {
    async actualizarParcial() {
      if(this.token){
        try {
        const body = {};

        if (this.nombre) body.nombre = this.nombre;
        if (this.apellido) body.apellido = this.apellido;
        if (this.provincia) body.provincia = this.provincia;
        if (this.genero) body.genero = this.genero;

        if (!this.nombre && !this.apellido && !this.provincia && !this.genero) {
          this.mensaje = "Ingrese al menos un campo para actualizar";
          this.exito = false;
          return;
        }

        await actualizarParcialFacade(this.id, body, this.token);

        this.mensaje = "Actualizado correctamente ";
        this.exito = true;

        this.nombre = "";
        this.apellido = "";
        this.provincia = "";
        this.genero = "";
      } catch (error) {
        console.error(error);

        this.mensaje = "Error al actualizar ";
        this.exito = false;
      }
      }
      
    },
  },
};
</script>

<style scoped>
.contenedor {
  max-width: 420px;
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
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.formulario button:hover {
  background: #369870;
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
