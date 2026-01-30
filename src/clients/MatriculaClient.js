import axios from 'axios';

const BASE_URL = 'http://localhost:8080/matricula/api/v1.0/estudiantes';

// GET todos
const consultarTodo = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
}

// GET por ID
const consultarId = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
}

// POST
const guardar = async (body) => {
    const response = await axios.post(BASE_URL, body);
    return response.data;
}

// PUT
const actualizar = async (id, body) => {
    const response = await axios.put(`${BASE_URL}/${id}`, body);
    return response.data;
}

// PATCH
const actualizarParcial = async (id, body) => {
    const response = await axios.patch(`${BASE_URL}/${id}`, body);
    return response.data;
}

// DELETE
const eliminar = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
}

// Facades
export const consultarTodoFacade = async () => await consultarTodo();
export const  consultarIdFacade = async (id) => await consultarId(id);
export const guardarFacade = async (body) => await guardar(body);
export const actualizarFacade = async (id, body) => await actualizar(id, body);
export const actualizarParcialFacade = async (id, body) => await actualizarParcial(id, body);
export const eliminarFacade = async (id) => await eliminar(id);
