<template>
    <div class="login">
        <h1>LOGIN</h1>
        <input v-model="usuario" type="text" placeholder="USUARIO">
        <input v-model="password" type="password" placeholder="CONTRASEÑA">
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
        }
    },
    methods: {
        async login() {
            try {
                // llamar al metodo de authclient
                const token = await obtenerTokenFacade();
                
                if (token) {
                    // bandera para el guardian
                    localStorage.setItem("estaAutenticado", "true");
                    console.log("Login exitoso");
                    
                    // Redirigir a una página protegida tras loguearse
                    this.$router.push({ name: 'mostrarTodo' });
                }
            } catch (error) {
                console.error("Error Autenticacion:", error);
                alert("Credenciales incorrectas o error de servidor");
            }
        }
    }
}
</script>

<style scoped>

.login{
    width: 300px;
    margin: 100px;
    padding: 20px;
    border: 1px solid red;
    border-radius: 10px;
    text-align: center;
}
input{
    width: 100%;
    margin-bottom: 10px;
    
}
button{
    width: 100%;
    cursor: pointer;
    
}

</style>