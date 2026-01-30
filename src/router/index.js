import { createRouter, createWebHistory } from 'vue-router'


const routes = [
 
  {
  path: '/guardar',
    name: 'guardar',
    component: () => import(/* webpackChunkName: "guardar" */ '../views/GuardarView.vue')
  },
  {
    path: '/mostrarTodo',
    name: 'mostrarTodo',
    component: () => import(/* webpackChunkName: "mostrarTodo" */ '../views/MostrarTodosView.vue')
  },
  {
    path: '/buscarId',
    name: 'buscarId',
    component: () => import(/* webpackChunkName: "buscarId" */ '../views/BuscarIdView.vue')
  },
  {
    path: '/actualizar',
    name: 'actualizar',
    component: () => import(/* webpackChunkName: "actualizar" */ '../views/ActualizarView.vue')
  },
  {
    path: '/actualizarParcial',
    name: 'actualizarParcial',
    component: () => import(/* webpackChunkName: "actualizarParcial" */ '../views/ActualizarParcialView.vue')
  },
  {
    path: '/eliminar',
    name: 'eliminar',
    component: () => import(/* webpackChunkName: "eliminar" */ '../views/EliminarView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
