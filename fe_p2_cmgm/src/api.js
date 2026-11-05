import axios from 'axios';

const http = axios.create({ baseURL: 'http://localhost:3000' });

const crud = (ruta) => ({
  listar: () => http.get(ruta).then((r) => r.data),
  crear: (datos) => http.post(ruta, datos).then((r) => r.data),
  editar: (id, datos) => http.patch(`${ruta}/${id}`, datos).then((r) => r.data),
  eliminar: (id) => http.delete(`${ruta}/${id}`).then((r) => r.data),
});

export const recintosApi = crud('/recintos');
export const eventosApi = crud('/eventos-culturales');

export const mensajeError = (e) => {
  const m = e.response?.data?.message;
  return Array.isArray(m) ? m.join(', ') : m || 'Error de conexion con el servidor';
};
