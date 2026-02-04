

import axios from 'axios'


const API_BASE_URL = 'http://localhost:8080/matricula/api/v1.0'

const ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJtYXRyaWN1bGEtYXV0aCIsInN1YiI6ImFkbWluIiwiZ3JvdXBzIjpbImFkbWluIl0sImlhdCI6MTc3MDIyMDI5NiwiZXhwIjoxNzcwMjIzODk2LCJqdGkiOiIxODdhNjM2My00YjEzLTQwNmItYTJmYS04NzIwMmRmYjdjNGUifQ.NIRWoOUHjoj2XZ3PgMavHlKp514MWA6GVZPdp0a7p1ohyJ6v72XH_ale-Jw18DKFl1sJlJGxoSmgBp4PUCNtL55xY5Se8zU3kcIC2un46-fhVSSUHNNPMPuqpXzvFtldq1mnzbTcXw9C3QjT8f4poyL_e8kvCjiwhfI16CbCNlO8gFR3ftiYpR2hIpBz8Qov6frJ_B0wfqwk_JQ-Jeu4YW284k5IW1kGyrZRCddPRfkBMiv5agypzltI_gonqHOo9Vr9hdLtedDg9fKMinMfNFC8dk_ErbfAJwJl0eKqHVT_W-m6zHGmeE9GdBjrEtej1lwPX58h7lUflmt5LG8AEg'



const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ACCESS_TOKEN}`
  },
  timeout: 10000
})


//interceptor
apiClient.interceptors.request.use(
  config => {
    console.log(` ${config.method.toUpperCase()} ${config.url}`)
    return config
  },
  error => {
    console.error(' Error en request:', error)
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  response => {
    console.log(`${response.status} ${response.config.url}`)
    return response
  },
  error => {
    if (error.response) {
      const { status } = error.response
      
      switch (status) {
        case 401:
          alert(
            ' TOKEN EXPIRADO O INVÁLIDO\n\n' 
          
          )
          break
        case 403:
          alert(' No tienes permisos. Usa un usuario con rol "admin".')
          break
        case 404:
          console.error('Recurso no encontrado')
          break
        case 500:
          alert(' Error del servidor. Verifica que los servicios estén corriendo.')
          break
      }
    } else if (error.request) {
      console.error(' No se recibió respuesta del servidor')
      alert(
        ' NO SE PUEDE CONECTAR AL SERVIDOR\n\n' +
        'Verifica que:\n' +
        '1. Auth Server → puerto 8082\n' +
        '2. API Server → puerto 8080'
      )
    }
    return Promise.reject(error)
  }
)



export async function consultarTodoFacade() {
  const response = await apiClient.get('/estudiantes')
  return response.data
}

export async function consultarIdFacade(id) {
  const response = await apiClient.get(`/estudiantes/${id}`)
  return response.data
}


export async function guardarFacade(estudiante) {
  const response = await apiClient.post('/estudiantes', estudiante)
  return response.data
}


export async function actualizarFacade(id, estudiante) {
  const response = await apiClient.put(`/estudiantes/${id}`, estudiante)
  return response.data
}


export async function actualizarParcialFacade(id, estudiante) {
  const response = await apiClient.patch(`/estudiantes/${id}`, estudiante)
  return response.data
}


export async function eliminarFacade(id) {
  const response = await apiClient.delete(`/estudiantes/${id}`)
  return response.data
}


export async function consultarHijosFacade(id) {
  const response = await apiClient.get(`/estudiantes/${id}/hijos`)
  return response.data
}


export async function buscarPorProvinciaGeneroFacade(provincia, genero) {
  const response = await apiClient.get('/estudiantes/provincia/genero', {
    params: { provincia, genero }
  })
  return response.data
}