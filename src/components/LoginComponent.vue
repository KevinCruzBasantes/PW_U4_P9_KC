<template>
  <div class="login">
    <h1>LOGIN</h1>
    <input v-model="usuario" type="text" placeholder="USUARIO" />
    <input v-model="password" type="password" placeholder="CONTRASEÑA" />
    <button @click="login">ENTRAR</button>
  </div>
</template>

<script>
import { obtenerTokenFacade } from "../clients/AuthClient.js";

export default {
  data() {
    return {
      usuario: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const token = await obtenerTokenFacade(this.usuario, this.password);

        if (token) {
          console.log("Login exitoso");

          // recuperar la ruta del localStorage
          const rutaPrevia = localStorage.getItem("rutaPrivada");

          //  destino la ruta guardada O mostrarTodo 
          const destino = rutaPrevia || "/mostrarTodo";

          // borramos la ruta para que no afecte al siguiente login
          localStorage.removeItem("rutaPrivada");

          // redirigir
          this.$router.push(destino);
        } else {
          console.log("Usuario o contraseña incorrectos");
        }
      } catch (error) {
        console.error("Error Autenticacion:", error);
      }
    },
  },
};
</script>

<style scoped>
.login {
  width: 300px;
  margin: 100px;
  padding: 20px;
  border: 1px solid red;
  border-radius: 10px;
  text-align: center;
}
input {
  width: 100%;
  margin-bottom: 10px;
}
button {
  width: 100%;
  cursor: pointer;
}
</style>