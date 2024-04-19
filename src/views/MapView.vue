<script setup>

import { ref } from 'vue';
import MapComponent from "@/components/MapComponent.vue"
import FilterComponent from '@/components/FilterComponent.vue'
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';


// todo fetch ok fabi 

const url = "http://212.132.100.147:8000/map";

async function callApi(url) {
  const headers = {
    'accept': 'application/json'
  };

  const response = await fetch(url, { headers });

  if (response.ok) {
    return await response.json();
  }
}

let data = callApi(url);

console.log("API DATA", data)


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
  ]]

const filter_names = ["radioactive", "air", "interpol", "autobahn", "weather_warnings"];
const filter_icons = ["mdi-radioactive", "mdi-weather-windy", "mdi-police-badge", "mdi-car", "mdi-weather-lightning-rainy"];
</script>


<template>
  <FilterComponent :names="filter_names" :icons="filter_icons" />

  <div id="container">
    <MapComponent :start_lon="51.163361" :start_lat="10.447683" />
  </div>
</template>



<style>
#container {
  height: 100%;
  width: 100%;
}
</style>