import axios from "axios";

const URL_AUTH = "http://localhost:8082/auth/token";

const obtenerToken = async () => {
    // recuperar un token
    const tokenGuardado = localStorage.getItem("token_auth");

    // si ya existe, lo retornamos
    if (tokenGuardado) {
        console.log("Reutilizando token del localStorage");
        return tokenGuardado;
    }

    // si no existe pedir token
    try {
        console.log("Solicitando nuevo token al servidor");
        const response = await axios.get(URL_AUTH, {
            params: {
                username: 'admin',
                password: 'admin123'
            }
        });

        const nuevoToken = response.data.accessToken;
        
        // guardamos para tener persistencia
        localStorage.setItem("token_auth", nuevoToken);
        
        return nuevoToken;
    } catch (error) {
        console.error("Error en la petición de autenticación:", error);
        throw error;
    }
};

export const obtenerTokenFacade = async () => {
    return await obtenerToken();
};

export const cerrarSesionFacade = () => {
    // Borramos el token específico
    localStorage.removeItem("token_auth");
    console.log("Sesión cerrada: Token eliminado");
    
    
};