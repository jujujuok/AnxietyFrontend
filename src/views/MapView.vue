<script setup>

import MapComponent from "@/components/MapComponent.vue"
import "leaflet/dist/leaflet.css";
import { ref } from 'vue';

import { VBtn, VBtnToggle } from 'vuetify/components';

const filter = defineModel({ default: [] });

const url = "https://api.risiko-radar.info/map";

</script>


<template>
  <div>
    <v-btn-toggle class="filter" v-model="filter" background-color="primary" dark multiple>
      <v-btn
        style="height:8vh; width:8vh; border: var(--dark-mode-text) solid 2px; border-radius: 15%; background-color: var(--dark-mode-lighter-bg); margin: 1vh 0; color: var(--dark-mode-text);"
        value="nina" icon="mdi-police-badge"></v-btn> <!-- interpol -->
      <v-btn
        style="height:8vh; width:8vh; border: var(--dark-mode-text) solid 2px; border-radius: 15%; background-color: var(--dark-mode-lighter-bg); margin: 1vh 0; color: var(--dark-mode-text);"
        value="street_report" icon="mdi-car"></v-btn>
      <v-btn
        style="height:8vh; width:8vh; border: var(--dark-mode-text) solid 2px; border-radius: 15%; background-color: var(--dark-mode-lighter-bg); margin: 1vh 0; color: var(--dark-mode-text);"
        value="weather" icon="mdi-weather-lightning-rainy"></v-btn>
    </v-btn-toggle>
  </div>

  <MapComponent :start_lon="51.163361" :start_lat="10.447683" :zoom_start="6" :url="url" :filter="filter" />
</template>

<style>
.filter {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    position: absolute;
    bottom: 0;
    right: 0;
    margin: 2vh 2vh;
    height: auto !important;

    z-index: 1000;
}
</style>