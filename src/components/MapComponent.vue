<script setup>

import { ref, onMounted } from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';

let props = defineProps({
  start_lon: Number,
  start_lat: Number,
  zoom_start: Number,
  items: [],
  areas: [],
})


const map = L.Map;

onMounted(() => {
  map.value = L.map('map').setView([props.start_lon, props.start_lat], props.zoom_start);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map.value);

  console.log( "item length : ",props.items.length)

  // ------------ ITEMS API --------------------
  props.items.forEach(item => {
    let item_color = "";
    let pop = "";
    let coords = [item.area.map(array => array.reverse())];

    // switch (item.type) {
    //   case "nina":
    //     color = 'blue';
    //     break;
    //   case "weather":
    //     color = 'green';
    //     break;
    //   case "street_report":
    //     color = 'yellow';
    //     break;
    //   default:
    //     color = 'red'; 
    //     break;
    // }

    console.log("item in map component", item)

    const polygon = L.polygon(coords, { color: item_color }).addTo(map.value);
    polygon.bindPopup(pop);
  });



  // --------------------- coords example
  props.areas.forEach(coords => {
    const polygon = L.polygon(coords, { color: 'red' }).addTo(map.value);

    polygon.bindPopup('This is a polygon');

    // // Hover effect
    polygon.on('mouseover', function (e) {
      polygon.setStyle({ fillOpacity: 0.7 });
    });
    polygon.on('mouseout', function (e) {
      polygon.setStyle({ fillOpacity: 0.2 });
    });
  });

  L.marker([50.0000, 8.6821]).addTo(map.value);
  L.marker([49.1234, 8.6821],).addTo(map.value);

  // L.polygon(latlngs2, { color: 'blue' }).addTo(map.value);
  // L.polygon(latlngs, { color: 'red' }).addTo(map.value);

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