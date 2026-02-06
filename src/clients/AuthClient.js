import axios from "axios";

const URL_AUTH = "http://localhost:8082/auth/token";

const obtenerToken = async (user, pass) => {
    // AJUSTE DE SEGURIDAD:
    // Si NO recibimos usuario ni contraseña, intentamos reutilizar el token guardado.
    // Esto sirve para cuando navegas entre páginas (mounted de otros componentes).
    if (!user && !pass) {
        const tokenGuardado = localStorage.getItem("token_auth");
        if (tokenGuardado) {
            console.log("Reutilizando token del localStorage");
            return tokenGuardado;
        }
    }

    // Si el usuario ingresó datos en el Login (user y pass tienen contenido),
    // saltamos lo anterior y obligamos a pedir un token nuevo al servidor.
    try {
        console.log("Solicitando validación de credenciales al servidor...");
        const response = await axios.get(URL_AUTH, {
            params: {
                username: user, 
                password: pass
            }
        });

        const nuevoToken = response.data.accessToken;
        
        if (nuevoToken) {
            localStorage.setItem("token_auth", nuevoToken);
            localStorage.setItem("estaAutenticado", "true");
            return nuevoToken;
        }
        
        return null;

    } catch (error) {
        console.error("Error en la petición de autenticación:", error);
        localStorage.removeItem("token_auth");
        localStorage.removeItem("estaAutenticado");
        throw error;
    }
};

// Quitamos los valores por defecto ('admin', '123') para que use lo que viene del formulario
export const obtenerTokenFacade = async (user, pass) => {
    return await obtenerToken(user, pass);
};

export const cerrarSesionFacade = () => {
    localStorage.removeItem("token_auth");
    localStorage.removeItem("estaAutenticado");
    console.log("Sesión cerrada: Datos eliminados");
};