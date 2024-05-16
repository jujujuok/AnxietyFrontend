<script setup>

import { ref } from 'vue';
import MapComponent from "@/components/MapComponent.vue"
import FilterComponent from '@/components/FilterComponent.vue'
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';

const url = "https://api.risiko-radar.info/world-map";

const filter_names = ["interpol", ""];
const filter_icons = [""];
</script>


<template>
  <FilterComponent :names="filter_names" :icons="filter_icons" />

  <div id="container">
    <MapComponent :start_lon="29.718582" :start_lat="19.152399" :zoom_start="2" :url="url"/>
  </div>
</template>



<style>
#container {
  height: 100%;
  width: 100%;
}
</style>
