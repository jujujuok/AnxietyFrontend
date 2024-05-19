<script setup>

import MapComponent from "@/components/MapComponent.vue"
import "leaflet/dist/leaflet.css";

const url = "https://api.risiko-radar.info/world-map";

</script>


<template>
  <!-- displays travel warnings -->

  <div id="container" style="margin-bottom: 0; height: 100%;width: 100%;">
    <MapComponent :start_lon="29.718582" :start_lat="19.152399" :zoom_start="2" :url="url" />
  </div>
</template>

