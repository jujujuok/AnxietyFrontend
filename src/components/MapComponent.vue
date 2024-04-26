<script setup>

import { ref, onMounted } from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';

let props = defineProps({
  start_lon: Number,
  start_lat: Number,
  zoom_start: Number,
  url: String
})

async function callApi(url) {
  const headers = {
    'accept': 'application/json'
  };

  const response = await fetch(url, { headers });

  if (response.ok) {
    return await response.json();
  }
}

const map = L.Map;

onMounted(async () => {
  map.value = L.map('map').setView([props.start_lon, props.start_lat], props.zoom_start);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map.value);

  callApi(props.url)
    .then(data => {
      console.log("API DATA", data);

      data.forEach(item => {
        let item_color = 'red';
        let pop = item.title;
        let coords = [[item.area.map(innerArray => innerArray.map(coord => coord.reverse()))]];

        switch (item.type) {
          case "nina":
            item_color = 'blue';
            break;
          case "weather":
            item_color = 'green';
            break;
          case "street_report":
            item_color = 'purple';
            break;
          default:
            item_color = 'red';
            break;
        }

        const polygon = L.polygon(coords, { color: item_color }).addTo(map.value);
        polygon.bindPopup(pop);
        polygon.on('mouseover', function (e) {
          polygon.setStyle({ fillOpacity: 0.7 });
        });
        polygon.on('mouseout', function (e) {
          polygon.setStyle({ fillOpacity: 0.2 });
        });
      });

    })
    .catch(error => {
      console.error("Error occurred:", error);
    });
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