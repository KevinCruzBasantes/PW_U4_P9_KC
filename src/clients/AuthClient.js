import axios from "axios";

// Nueva URL de acceso directo
const URL_LOGIN = "http://localhost:8082/oauth/login";

export const obtenerTokenFacade = async () => {
  const params = new URLSearchParams();
  // Enviamos credenciales directamente
  params.append('username', 'admin'); 
  params.append('password', '123');

  try {
    const response = await axios.post(URL_LOGIN, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    
    // Retornamos el access_token que ahora viene directamente del login
    return response.data.access_token;
  } catch (error) {
    console.error("Error en la autenticación directa:", error);
    throw error;
  }
};