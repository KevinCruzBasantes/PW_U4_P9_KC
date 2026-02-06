import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "../views/LoginView.vue"
const routes = [
  {
    path: '/',
    redirect: '/mostrarTodo'
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
    //meta pone una marca para decir autorizacion
    meta:{
      requiereAutorizacion:false, 
      esPublica: false,
    }
  },
  {
    path: '/mostrarTodo',
    name: 'mostrarTodo',
    component: () => import('../views/MostrarTodosView.vue'),
    meta:{
      requiereAutorizacion:false, 
      esPublica: false,
    }
  },
  {
    path: '/buscarId',
    name: 'buscarId',
    component: () => import('../views/BuscarIdView.vue'),
    meta:{
      requiereAutorizacion:true, 
      esPublica: false,
    }
  },
  {
    path: '/actualizar',
    name: 'actualizar',
    component: () => import('../views/ActualizarView.vue'),
    meta:{
      requiereAutorizacion:false, 
      esPublica: false,
    }
  },
  {
    path: '/actualizarParcial',
    name: 'actualizarParcial',
    component: () => import('../views/ActualizarParcialView.vue'),
    meta:{
      requiereAutorizacion:true, 
      esPublica: false,
    }
  },
  {
    path: '/eliminar',
    name: 'eliminar',
    component: () => import('../views/EliminarView.vue'),
    meta:{
      requiereAutorizacion:true, 
      esPublica: false,
    }
  }
]

const router = createRouter({
  
  history: createWebHistory(import.meta.env.BASE_URL || process.env.BASE_URL),
  routes
})

//configuracion del guardian, to a donde quiero acceder, 
// from de que pagina vengo, 
// next permite decir si le permito ir a la pagina o redireccionar
router.beforeEach((to, from, next) => {
  const estaAutenticado = localStorage.getItem("estaAutenticado") === "true";

  if (to.meta.requiereAutorizacion) {
    if (estaAutenticado) {
      next(); 
    } else {
      console.log("Acceso denegado: Redirigiendo al login");
      next({ name: 'login' }); 
    }
  } else {
    if (to.name === 'login' && estaAutenticado) {
      next({ name: 'mostrarTodo' });
    } else {
      console.log("Pase libre a:", to.path);
      next();
    }
  }
});

export default router