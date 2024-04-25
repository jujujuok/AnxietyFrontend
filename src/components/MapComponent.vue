<script setup lang="ts">

import { ref, onMounted } from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';

let props = defineProps<{
  start_lon: number
  start_lat: number
  pins?: Array<number>
  areas?: Array<number>
  title?: string
  likes?: number
}>();

const map = ref({} as L.Map);


onMounted(() => {
  map.value = L.map('map').setView([props.start_lon, props.start_lat], 6);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map.value);

  L.marker([50.0000, 8.6821]).addTo(map.value);
  L.marker([49.1234, 8.6821],).addTo(map.value);

  // L.polygon(latlngs2, { color: 'blue' }).addTo(map.value);
  // L.polygon(latlngs, { color: 'red' }).addTo(map.value);

  // coordinates.forEach(coords => {
  //   const polygon = L.polygon(coords, { color: 'red' }).addTo(map.value);

  //   polygon.bindPopup('This is a polygon');

  //   // // Hover effect
  //   polygon.on('mouseover', function (e) {
  //     this.setStyle({ fillOpacity: 0.7 });
  //   });
  //   polygon.on('mouseout', function (e) {
  //     this.setStyle({ fillOpacity: 0.2 });
  //   });
  // });

});
</script>


<template>
  <div id="map" style="height:80vh;"></div>
</template>

<style>
#map {
  height: calc(100vh - 10%);
}

@media (min-width: 1024px) {
  .map {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>