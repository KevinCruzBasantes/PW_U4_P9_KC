import axios from "axios";

const URL_AUTH = "http://localhost:8082/auth/token";


const obtenerToken = async (user, pass) => {
    // recuperar un token existente del localStorage
    const tokenGuardado = localStorage.getItem("token_auth");

    // si existe lo retornamos
    if (tokenGuardado) {
        console.log("Reutilizando token del localStorage");
        return tokenGuardado;
    }

    try {
        console.log("Solicitando nuevo token al servidor...");
        const response = await axios.get(URL_AUTH, {
            params: {
                username: user, // usamos las credenciales
                password: pass
            }
        });

        // Extraemos el token 
        const nuevoToken = response.data.accessToken;
        
        if (nuevoToken) {
            // Guardamos el token para futuras peticiones
            localStorage.setItem("token_auth", nuevoToken);
            // marcamos como autenticado para el Guardian del Router
            localStorage.setItem("estaAutenticado", "true");
            
            return nuevoToken;
        }
        
        return null;

    } catch (error) {
        console.error("Error en la petición de autenticación:", error);
        // Borramos cualquier rastro si la petición falla
        localStorage.removeItem("token_auth");
        localStorage.removeItem("estaAutenticado");
        throw error;
    }
};


export const obtenerTokenFacade = async (user = 'admin', pass = '123') => {
    return await obtenerToken(user, pass);
};


export const cerrarSesionFacade = () => {
    localStorage.removeItem("token_auth");
    localStorage.removeItem("estaAutenticado");
    console.log("Sesión cerrada: Datos eliminados");
};