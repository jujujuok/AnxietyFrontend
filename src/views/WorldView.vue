<script setup>

import MapComponent from "@/components/MapComponent.vue"
import "leaflet/dist/leaflet.css";

const url = "https://api.risiko-radar.info/world-map";

</script>


<template>
  <!-- displays travel warnings -->

  <div id="container">
    <MapComponent :start_lon="29.718582" :start_lat="19.152399" :zoom_start="2" :url="url" />
  </div>
</template>



<style>
#container {
  height: 100%;
  width: 100%;
}
</style>
