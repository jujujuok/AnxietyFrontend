<template>
  <div>
    <h1 class="green">Anxiety Map</h1>
    <div id="container">
      <div id="map" style="height:80vh;"></div>
      <!--
        Build an interactive Map:
        https://medium.com/@smhabibjr/implement-an-interactive-map-in-the-vue-js-8a865010fb41
      -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';

const initialMap = ref(null);

onMounted(()=> {
    initialMap.value = L.map('map').setView([51.163361, 10.447683], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, 
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(initialMap.value);
});
</script>


<style>
#mapContainer {
  min-height: 69vh;
  display: flex;
  align-items: center;
}

@media (min-width: 1024px) {
  .map {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>