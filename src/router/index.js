import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/mostrarTodo'
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
router.beforeEach((to, from, next)=>{
  if(to.meta.requiereAutorizacion){
    //le envio a una pagina de login
    console.log("Redirigiendo al login")
  }else{
    //le dejo pasar sin autenticacion
    console.log("Pase libre")
    next()
  }
})

export default router