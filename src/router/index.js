import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/mostrarTodo'
  },
  {
    path: '/guardar',
    name: 'guardar',
    component: () => import('../views/GuardarView.vue')
  },
  {
    path: '/mostrarTodo',
    name: 'mostrarTodo',
    component: () => import('../views/MostrarTodosView.vue')
  },
  {
    path: '/buscarId',
    name: 'buscarId',
    component: () => import('../views/BuscarIdView.vue')
  },
  {
    path: '/actualizar',
    name: 'actualizar',
    component: () => import('../views/ActualizarView.vue')
  },
  {
    path: '/actualizarParcial',
    name: 'actualizarParcial',
    component: () => import('../views/ActualizarParcialView.vue')
  },
  {
    path: '/eliminar',
    name: 'eliminar',
    component: () => import('../views/EliminarView.vue')
  }
]

const router = createRouter({
  
  history: createWebHistory(import.meta.env.BASE_URL || process.env.BASE_URL),
  routes
})

export default router