<script setup>
import { onMounted, ref } from 'vue';
import { eventosApi, recintosApi, mensajeError } from '../api';

const eventos = ref([]);
const recintos = ref([]);
const error = ref('');
const editandoId = ref(null);
const estados = ['Programado', 'Agotado', 'Cancelado'];
const vacio = () => ({
  id_recinto: '',
  titulo: '',
  artista_principal: '',
  duracion_minutos: null,
  precio_entrada: null,
  fecha_evento: '',
  estado: 'Programado',
});
const form = ref(vacio());

const cargar = async () => {
  error.value = '';
  try {
    const [listaEventos, listaRecintos] = await Promise.all([
      eventosApi.listar(),
      recintosApi.listar(),
    ]);
    eventos.value = listaEventos;
    recintos.value = listaRecintos;
  } catch (e) {
    error.value = mensajeError(e);
  }
};

const guardar = async () => {
  error.value = '';
  try {
    if (editandoId.value) await eventosApi.editar(editandoId.value, form.value);
    else await eventosApi.crear(form.value);
    cancelar();
    await cargar();
  } catch (e) {
    error.value = mensajeError(e);
  }
};

const editar = (ev) => {
  editandoId.value = ev.id;
  form.value = {
    id_recinto: ev.id_recinto,
    titulo: ev.titulo,
    artista_principal: ev.artista_principal,
    duracion_minutos: ev.duracion_minutos,
    precio_entrada: ev.precio_entrada,
    fecha_evento: ev.fecha_evento,
    estado: ev.estado,
  };
};

const cancelar = () => {
  editandoId.value = null;
  form.value = vacio();
};

const eliminar = async (id) => {
  if (!confirm('Eliminar este evento?')) return;
  error.value = '';
  try {
    await eventosApi.eliminar(id);
    await cargar();
  } catch (e) {
    error.value = mensajeError(e);
  }
};

onMounted(cargar);
</script>

<template>
  <section>
    <h2>{{ editandoId ? 'Editar evento' : 'Nuevo evento' }}</h2>
    <form @submit.prevent="guardar">
      <label>Recinto
        <select v-model.number="form.id_recinto" required>
          <option value="" disabled>Seleccione...</option>
          <option v-for="r in recintos" :key="r.id" :value="r.id">{{ r.nombre }} ({{ r.ciudad }})</option>
        </select>
      </label>
      <label>Titulo <input v-model="form.titulo" maxlength="150" required /></label>
      <label>Artista principal <input v-model="form.artista_principal" maxlength="100" required /></label>
      <label>Duracion (minutos) <input v-model.number="form.duracion_minutos" type="number" min="1" required /></label>
      <label>Precio de entrada <input v-model.number="form.precio_entrada" type="number" min="0" step="0.01" required /></label>
      <label>Fecha del evento <input v-model="form.fecha_evento" type="date" required /></label>
      <label>Estado
        <select v-model="form.estado" required>
          <option v-for="e in estados" :key="e" :value="e">{{ e }}</option>
        </select>
      </label>
      <div>
        <button type="submit">{{ editandoId ? 'Actualizar' : 'Guardar' }}</button>
        <button v-if="editandoId" type="button" @click="cancelar">Cancelar</button>
      </div>
    </form>
    <p class="error">{{ error }}</p>

    <table>
      <thead>
        <tr>
          <th>Id</th><th>Recinto</th><th>Titulo</th><th>Artista</th><th>Min.</th>
          <th>Precio</th><th>Fecha</th><th>Estado</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ev in eventos" :key="ev.id">
          <td>{{ ev.id }}</td>
          <td>{{ ev.recinto?.nombre }}</td>
          <td>{{ ev.titulo }}</td>
          <td>{{ ev.artista_principal }}</td>
          <td>{{ ev.duracion_minutos }}</td>
          <td>{{ ev.precio_entrada }}</td>
          <td>{{ ev.fecha_evento }}</td>
          <td>{{ ev.estado }}</td>
          <td class="acciones">
            <button @click="editar(ev)">Editar</button>
            <button @click="eliminar(ev.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
