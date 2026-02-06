import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "../views/LoginView.vue"

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/guardar',
    name: 'guardar',
    component: () => import('../views/GuardarView.vue'),
    meta: { requiereAutorizacion: true } // Cambiado a true para que funcione la redirección
  },
  {
    path: '/mostrarTodo',
    name: 'mostrarTodo',
    component: () => import('../views/MostrarTodosView.vue'),
    meta: { requiereAutorizacion: true } // Cambiado a true para protegerla
  },
  {
    path: '/buscarId',
    name: 'buscarId',
    component: () => import('../views/BuscarIdView.vue'),
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/actualizar',
    name: 'actualizar',
    component: () => import('../views/ActualizarView.vue'),
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/actualizarParcial',
    name: 'actualizarParcial',
    component: () => import('../views/ActualizarParcialView.vue'),
    meta: { requiereAutorizacion: true }
  },
  {
    path: '/eliminar',
    name: 'eliminar',
    component: () => import('../views/EliminarView.vue'),
    meta: { requiereAutorizacion: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || process.env.BASE_URL),
  routes
})

// GUARDIAN ÚNICO CORREGIDO
router.beforeEach((to, from, next) => {
  const estaAutenticado = localStorage.getItem("estaAutenticado") === "true";

  if (to.meta.requiereAutorizacion) {
    if (estaAutenticado) {
      next(); // acceder a la pagina
    } else {
      // ruta a la que el usuario intentaba entrar
      localStorage.setItem("rutaPrivada", to.fullPath);
      console.log("Acceso denegado. Guardando ruta para después:", to.fullPath);
      
      next({ name: 'login' }); 
    }
  } else {
    // Si el usuario ya está logueado e intenta ir al login manualmente
    if (to.name === 'login' && estaAutenticado) {
      // Revisamos si tiene una ruta pendiente en el "bolsillo"
      const destino = localStorage.getItem("rutaPrivada") || "/mostrarTodo";
      next({ path: destino });
    } else {
      next(); // Rutas públicas (como el login cuando no estás autenticado)
    }
  }
});

export default router