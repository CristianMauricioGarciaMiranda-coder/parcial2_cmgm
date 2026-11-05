<script setup>
import { ref } from 'vue';
import RecintosView from './components/RecintosView.vue';
import EventosView from './components/EventosView.vue';

const pestana = ref('recintos');
</script>

<template>
  <main>
    <h1>Agenda y boletaje de eventos culturales</h1>
    <nav>
      <button :class="{ activa: pestana === 'recintos' }" @click="pestana = 'recintos'">Recintos</button>
      <button :class="{ activa: pestana === 'eventos' }" @click="pestana = 'eventos'">Eventos culturales</button>
    </nav>
    <RecintosView v-if="pestana === 'recintos'" />
    <EventosView v-else />
  </main>
</template>

<style>
body { font-family: Arial, sans-serif; background: #f4f4f8; margin: 0; }
main { max-width: 1000px; margin: 0 auto; padding: 20px; }
nav button { padding: 8px 16px; margin-right: 6px; border: 1px solid #555; background: #fff; cursor: pointer; }
nav button.activa { background: #3b4cca; color: #fff; }
form { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 16px 0; }
label { display: flex; flex-direction: column; font-size: 14px; }
input, select { padding: 6px; }
table { width: 100%; border-collapse: collapse; background: #fff; }
th, td { border: 1px solid #ccc; padding: 6px; text-align: left; font-size: 14px; }
.error { color: #b00020; }
.acciones button { margin-right: 4px; }
</style>
