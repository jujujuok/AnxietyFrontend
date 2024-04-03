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

var latlngs = [
  [51.1657, 10.4515],
  [52.5200, 13.4050],
  [48.7758, 9.1829],
  [50.1109, 8.6821],
  [53.5511, 9.9937]
];

var latlngs2 = [
  [
    8.3203,
    48.5886
  ],
  [
    8.209,
    48.4666
  ],
  [
    8.2159,
    48.4568
  ],
  [
    8.1311,
    48.6068
  ]
].map(array => array.reverse())


const map = ref(null);

onMounted(() => {
  map.value = L.map('map').setView([51.163361, 10.447683], 6);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map.value);

  L.marker([50.0000, 8.6821]).addTo(map.value);
  L.marker([49.1234, 8.6821],).addTo(map.value);

  L.polygon(latlngs2, { color: 'blue' }).addTo(map.value);
  L.polygon(latlngs, { color: 'red' }).addTo(map.value);
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