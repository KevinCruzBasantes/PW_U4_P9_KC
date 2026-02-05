import axios from "axios";

const URL_AUTH = "http://localhost:8082/auth/token";

export const obtenerTokenFacade = async () => {
  try {
    const response = await axios.get(URL_AUTH, {
      params: {
        username: 'admin',
        password: 'admin123'
      }
    });
    
    return response.data.accessToken;
  } catch (error) {
    console.error("Error obteniendo el token :", error);
    throw error;
  }
};