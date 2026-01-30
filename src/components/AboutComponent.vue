<template>
   <div>
    <button @click="mostrarTodos">Mostrar Todos</button>
    <button @click="buscarId">Buscar Id</button>
    <button @click="guardar">Guardar</button>
    <button @click="actualizar">Actualizar</button>
    <button @click="actualizarParcial">Actualizar Parcial</button>
    <button @click="eliminar">Eliminar</button>
   </div>

</template>

<script>
import { consultarTodoFacade, 
    consultarIdFacade,
     guardarFacade, 
     actualizarFacade, 
     actualizarParcialFacade, 
     eliminarFacade } from "../clients/MatriculaClient.js";
export default {
    methods: {
        async mostrarTodos() {
            try {
                const respuesta = await consultarTodoFacade();
                console.log("Todos los registros:", respuesta);
                alert("Se obtuvieron los registros correctamente");
            } catch (error) {
                console.error("Error al consultar todos:", error);
                alert("Error al consultar todos los registros");
            }
        },
        async buscarId() {
            try {
                const id = prompt("Ingrese el ID a buscar:");
                if (id) {
                    const respuesta = await consultarIdFacade(id);
                    console.log("Registro encontrado:", respuesta);
                    alert("Registro encontrado correctamente");
                }
            } catch (error) {
                console.error("Error al buscar por ID:", error);
                alert("Error al buscar el registro");
            }
        },
        async guardar() {
            try {
                const datos = {
                    // Rellene con los datos necesarios
                };
                const respuesta = await guardarFacade(datos);
                console.log("Registro guardado:", respuesta);
                alert("Registro guardado correctamente");
            } catch (error) {
                console.error("Error al guardar:", error);
                alert("Error al guardar el registro");
            }
        },
        async actualizar() {
            try {
                const id = prompt("Ingrese el ID a actualizar:");
                if (id) {
                    const datos = {
                        // Rellene con los datos necesarios
                    };
                    const respuesta = await actualizarFacade(id, datos);
                    console.log("Registro actualizado:", respuesta);
                    alert("Registro actualizado correctamente");
                }
            } catch (error) {
                console.error("Error al actualizar:", error);
                alert("Error al actualizar el registro");
            }
        },
        async actualizarParcial() {
            try {
                const id = prompt("Ingrese el ID a actualizar parcialmente:");
                if (id) {
                    const datos = {
                        // Rellene con los datos necesarios
                    };
                    const respuesta = await actualizarParcialFacade(id, datos);
                    console.log("Registro actualizado parcialmente:", respuesta);
                    alert("Registro actualizado parcialmente correctamente");
                }
            } catch (error) {
                console.error("Error al actualizar parcialmente:", error);
                alert("Error al actualizar parcialmente el registro");
            }
        },
        async eliminar() {
            try {
                const id = prompt("Ingrese el ID a eliminar:");
                if (id) {
                    const respuesta = await eliminarFacade(id);
                    console.log("Registro eliminado:", respuesta);
                    alert("Registro eliminado correctamente");
                }
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("Error al eliminar el registro");
            }
        }
    }
}
</script>

<style>

</style>