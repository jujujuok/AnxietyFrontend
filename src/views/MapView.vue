<script setup>

import MapComponent from "@/components/MapComponent.vue"
import FilterComponent from "@/components/FilterComponent.vue";
import "leaflet/dist/leaflet.css";
import { ref } from 'vue';


const url = "http://api.risiko-radar.info/map";

const filter = ref([]);

</script>


<template>
  <FilterComponent :names="filter_names" :icons="filter_icons" v-model="filter" />

  <MapComponent :start_lon="51.163361" :start_lat="10.447683" :zoom_start="6" :url="url" :filter="filter"/>
</template>

<!-- todo dynamic filter
const filter_names = ["radioactive", "air", "interpol", "autobahn", "weather_warnings"];
const filter_icons = ["mdi-radioactive", "mdi-weather-windy", "mdi-police-badge", "mdi-car", "mdi-weather-lightning-rainy"]; -->
