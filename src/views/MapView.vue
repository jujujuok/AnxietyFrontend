<script setup>

import { ref } from 'vue';
import MapComponent from "@/components/MapComponent.vue"
import FilterComponent from '@/components/FilterComponent.vue'
import "leaflet/dist/leaflet.css";

const coordinates = [
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
  ]
]


const url = "http://api.risiko-radar.info/map";

async function callApi(url) {
  const headers = {
    'accept': 'application/json'
  };

  const response = await fetch(url, { headers });

  if (response.ok) {
    return await response.json();
  }
}

callApi(url)
  .then(data => {
    // console.log("API DATA", data);

    data.forEach(item => {
      // console.log("ID:", item.id);
      // console.log("Type:", item.type);
      // console.log("Warning:", item.warning);
      console.log("area:",item.area)

      // coordinates[0][0].push(item.area.map(array => array.reverse()))
    });

  })
  .catch(error => {
    console.error("Error occurred:", error);
  });


console.log("API DATA", data)




const filter_names = ["radioactive", "air", "interpol", "autobahn", "weather_warnings"];
const filter_icons = ["mdi-radioactive", "mdi-weather-windy", "mdi-police-badge", "mdi-car", "mdi-weather-lightning-rainy"];
</script>


<template>
  <FilterComponent :names="filter_names" :icons="filter_icons" />

  <div id="container">
    <MapComponent :start_lon="51.163361" :start_lat="10.447683" :zoom_start="6" :areas="coordinates" />
  </div>
</template>



<style>
#container {
  height: 100%;
  width: 100%;
}
</style>