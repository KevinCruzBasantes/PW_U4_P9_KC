import axios from 'axios';

const consultarTodo = () => {
    const data = axios.get('http://localhost:8081/matricula/api/v1.0/estudiantes').then(response => response.data);
  return data;
}
