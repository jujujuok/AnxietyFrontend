<script setup>
import { ref } from 'vue';

const selectedFilters = ref([]);

function getSelection() {
  return selectedFilters.value;
}
</script>

<template>
  <div class="dashboard">
    <h1 class="green">Dashboard</h1>

    <v-btn-toggle v-model="selectedFilters" stacked background-color="primary" dark multiple>
      <v-btn value="radioactive" icon="mdi-radioactive"></v-btn>
      <v-btn value="air" icon="mdi-weather-windy"></v-btn>
      <v-btn value="interpol" icon="mdi-police-badge"></v-btn>
      <v-btn value="autobahn" icon="mdi-car"></v-btn>
      <v-btn value="weather_warnings" icon="mdi-weather-lightning-rainy"></v-btn>
      <!-- <pre>{{ toggleMultiple }}</pre> -->
    </v-btn-toggle>
  </div>
</template>
