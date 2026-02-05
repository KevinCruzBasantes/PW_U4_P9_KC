import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/matricula/api/v1.0';

// Función interna para no repetir código de headers
const configurarHeaders = (token) => ({
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

export async function consultarIdFacade(id, token) {
  const response = await axios.get(
    `${API_BASE_URL}/estudiantes/${id}`, 
    configurarHeaders(token)
  );
  return response.data;
}

export async function actualizarFacade(id, estudiante, token) {
  const response = await axios.put(
    `${API_BASE_URL}/estudiantes/${id}`, 
    estudiante, 
    configurarHeaders(token)
  );
  return response.data;
}