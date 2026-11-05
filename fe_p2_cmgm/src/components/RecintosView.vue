<script setup>
import { onMounted, ref } from 'vue';
import { recintosApi, mensajeError } from '../api';

const recintos = ref([]);
const error = ref('');
const editandoId = ref(null);
const vacio = () => ({ nombre: '', ciudad: '', aforo_maximo: null });
const form = ref(vacio());

const cargar = async () => {
  error.value = '';
  try {
    recintos.value = await recintosApi.listar();
  } catch (e) {
    error.value = mensajeError(e);
  }
};

const guardar = async () => {
  error.value = '';
  try {
    const datos = { ...form.value, aforo_maximo: form.value.aforo_maximo || undefined };
    if (editandoId.value) await recintosApi.editar(editandoId.value, datos);
    else await recintosApi.crear(datos);
    cancelar();
    await cargar();
  } catch (e) {
    error.value = mensajeError(e);
  }
};

const editar = (r) => {
  editandoId.value = r.id;
  form.value = { nombre: r.nombre, ciudad: r.ciudad, aforo_maximo: r.aforo_maximo };
};

const cancelar = () => {
  editandoId.value = null;
  form.value = vacio();
};

const eliminar = async (id) => {
  if (!confirm('Eliminar este recinto?')) return;
  error.value = '';
  try {
    await recintosApi.eliminar(id);
    await cargar();
  } catch (e) {
    error.value = mensajeError(e);
  }
};

onMounted(cargar);
</script>

<template>
  <section>
    <h2>{{ editandoId ? 'Editar recinto' : 'Nuevo recinto' }}</h2>
    <form @submit.prevent="guardar">
      <label>Nombre <input v-model="form.nombre" maxlength="100" required /></label>
      <label>Ciudad <input v-model="form.ciudad" maxlength="50" required /></label>
      <label>Aforo maximo (opcional) <input v-model.number="form.aforo_maximo" type="number" min="1" /></label>
      <div>
        <button type="submit">{{ editandoId ? 'Actualizar' : 'Guardar' }}</button>
        <button v-if="editandoId" type="button" @click="cancelar">Cancelar</button>
      </div>
    </form>
    <p class="error">{{ error }}</p>

    <table>
      <thead>
        <tr><th>Id</th><th>Nombre</th><th>Ciudad</th><th>Aforo</th><th>Acciones</th></tr>
      </thead>
      <tbody>
        <tr v-for="r in recintos" :key="r.id">
          <td>{{ r.id }}</td>
          <td>{{ r.nombre }}</td>
          <td>{{ r.ciudad }}</td>
          <td>{{ r.aforo_maximo ?? '-' }}</td>
          <td class="acciones">
            <button @click="editar(r)">Editar</button>
            <button @click="eliminar(r.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
