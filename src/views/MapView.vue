<template>
  <div>
    <h1 class="green">Anxiety Map</h1>
    <v-radio-group>
      <v-radio label="Radio One" value="one"></v-radio>
      <v-radio label="Radio Two" value="two"></v-radio>
      <v-radio label="Radio Three" value="three"></v-radio>
    </v-radio-group>
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
import axios from 'axios';

const url = "http://212.132.100.147:8000/dashboard";


// async callApi(url: string, accept ?: string) {
function callApi(url){
  const headers = {
    'accept': 'application/json'
  };

  try {
    const response = axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

var data = callApi(url);

console.log(data)

// var unwetter = [
//   [
//     [
//       8.0513,
//       48.2218
//     ],
//     [
//       8.0827,
//       48.2045
//     ],
//     [
//       8.057,
//       48.2045
//     ],
//     [
//       8.0513,
//       48.2218
//     ]
//   ].map(array => array.reverse()),
//   [
//     [
//       8.0557,
//       48.6751
//     ],
//     [
//       8.0557,
//       48.6751
//     ]
//   ].map(array => array.reverse())
// ]


const map = ref(null);

onMounted(() => {
  map.value = L.map('map').setView([51.163361, 10.447683], 6);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map.value);

  L.marker([50.0000, 8.6821]).addTo(map.value);
  L.marker([49.1234, 8.6821],).addTo(map.value);

  // L.polygon(latlngs2, { color: 'blue' }).addTo(map.value);
  // L.polygon(latlngs, { color: 'red' }).addTo(map.value);

  unwetter.forEach(coords => {
    const polygon = L.polygon(coords, { color: 'red' }).addTo(map.value);

    polygon.bindPopup('This is a polygon');

    // // Hover effect
    polygon.on('mouseover', function (e) {
      this.setStyle({ fillOpacity: 0.7 });
    });
    polygon.on('mouseout', function (e) {
      this.setStyle({ fillOpacity: 0.2 });
    });
  });
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