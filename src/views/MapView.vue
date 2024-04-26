<script setup>

import MapComponent from "@/components/MapComponent.vue"
import FilterComponent from '@/components/FilterComponent.vue'
import "leaflet/dist/leaflet.css";

const url = "http://api.risiko-radar.info/map";

</script>


<template>
  <FilterComponent :names="filter_names" :icons="filter_icons" />

  <div id="container">
    <MapComponent :start_lon="51.163361" :start_lat="10.447683" :zoom_start="6" :url="url" />
  </div>
</template>

<!-- todo dynamic filter
const filter_names = ["radioactive", "air", "interpol", "autobahn", "weather_warnings"];
const filter_icons = ["mdi-radioactive", "mdi-weather-windy", "mdi-police-badge", "mdi-car", "mdi-weather-lightning-rainy"]; -->


<style>
#container {
  height: 100%;
  width: 100%;
}
</style>