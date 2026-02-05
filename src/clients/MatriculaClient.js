import axios from "axios";

// URL de la API de Estudiantes
const URL = "http://localhost:8080/matricula/api/v1.0/estudiantes";



const consultarTodos = async (token) => {
    const data = await axios.get(`${URL}`, { 
        headers: { Authorization: `Bearer ${token}` } 
    }).then(r => r.data);
    return data;
}

const consultarPorId = async (id, token) => {
    const data = await axios.get(`${URL}/${id}`, { 
        headers: { Authorization: `Bearer ${token}` } 
    }).then(r => r.data);
    return data;
}

const guardar = async (body, token) => {
    const data = await axios.post(`${URL}`, body, { 
        headers: { Authorization: `Bearer ${token}` } 
    }).then(r => r.data);
    return data;
}

const actualizar = async (id, body, token) => {
    const data = await axios.put(`${URL}/${id}`, body, { 
        headers: { Authorization: `Bearer ${token}` } 
    }).then(r => r.data);
    return data;
}

const actualizarParcial = async (id, body, token) => {
    const data = await axios.patch(`${URL}/${id}`, body, { 
        headers: { Authorization: `Bearer ${token}` } 
    }).then(r => r.data);
    return data;
}

const borrar = async (id, token) => {
    await axios.delete(`${URL}/${id}`, { 
        headers: { Authorization: `Bearer ${token}` } 
    }).then(r => r.data);
}

//Fachadas 

export const consultarTodoFacade = async (token) => {
    return await consultarTodos(token);
}

export const consultarIdFacade = async (id, token) => {
    return await consultarPorId(id, token);
}

export const guardarFacade = async (body, token) => {
    return await guardar(body, token);
}

export const actualizarFacade = async (id, body, token) => {
    return await actualizar(id, body, token);
}

export const actualizarParcialFacade = async (id, body, token) => {
    return await actualizarParcial(id, body, token);
}

export const eliminarFacade = async (id, token) => {
    await borrar(id, token);
}