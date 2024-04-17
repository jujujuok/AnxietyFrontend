<template>
  <div class="filter">
    <v-btn-toggle v-model="displaySelection" background-color="primary" dark multiple>
      <v-btn value="radioactive" icon="mdi-radioactive"></v-btn>
      <v-btn value="air" icon="mdi-weather-windy"></v-btn>
      <v-btn value="interpol" icon="mdi-police-badge"></v-btn>
      <v-btn value="autobahn" icon="mdi-car"></v-btn>
      <v-btn value="weather_warnings" icon="mdi-weather-lightning-rainy"></v-btn>
      <!-- <pre>{{ toggleMultiple }}</pre> -->
    </v-btn-toggle>
  </div>
  <div id="container">
    <div id="map" style="height:80vh;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';


// todo fetch ok fabi 
import { VBtn, VBtnToggle } from 'vuetify/components';

const url = "http://212.132.100.147:8000/map";

let displaySelection = ref(true);


// async callApi(url: string, accept ?: string) {
async function callApi(url) {
  const headers = {
    'accept': 'application/json'
  };

  const response = await fetch(url, { headers });

  if (response.ok) {
    return await response.json();
  }
}
// console.log("Environment: ",process.env.NODE_ENV)

let data = callApi(url);

console.log("API DATA", data)


var coordinates = [
  [
    [
      [
        8.2,
        48.7
      ],
      [
        8.9,
        48.7
      ],
      [
        8.0,
        50.0
      ]
    ].map(array => array.reverse())
  ]]


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


  console.log("displayselection value", displaySelection)

  coordinates.forEach(coords => {
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
.filter {
  /* position: fixed; */
  /* right: 0; */
}

.v-btn-toggle {
  /* flex-direction: column; */
}

#container {
  height: 100%;
  width: 100%;
}

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