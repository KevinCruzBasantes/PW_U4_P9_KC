<template>
  <div class="contenedor">

    <h2>Pantalla para Guardar Estudiante</h2>

    <form class="formulario" @submit.prevent="guardarEstudiante">

      <label>Nombre</label>
      <input type="text" v-model="nombre" required />

      <label>Apellido</label>
      <input type="text" v-model="apellido" required />

      <label>Fecha Nacimiento</label>
      <input type="datetime-local" v-model="fechaNacimiento" required />

      <label>Provincia</label>
      <input type="text" v-model="provincia" required />

      <label>Género</label>
      <input type="text" v-model="genero" required />

      <button type="submit">Guardar</button>

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
import { guardarFacade } from "../clients/MatriculaClient.js";
import { obtenerTokenFacade } from "../clients/AuthClient.js";

export default {

  data() {
    return {
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
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

    async guardarEstudiante() {

      const estudiante = {
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: this.fechaNacimiento,
        provincia: this.provincia,
        genero: this.genero,
      };

      if(this.token){
        try {

        await guardarFacade(estudiante, this.token);

        this.mensaje = " Estudiante creado correctamente";
        this.exito = true;

        this.nombre = "";
        this.apellido = "";
        this.fechaNacimiento = "";
        this.provincia = "";
        this.genero = "";

      } catch (error) {

        console.error(error);

        this.mensaje = "Error al crear el estudiante";
        this.exito = false;
      }
      }
    },
  },
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
}

.formulario {
  display: flex;
  flex-direction: column;
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
  text-align: center;
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
