<template>
  <div>
    <h1>Anxiety Map</h1>
    <div style="height:600px; width:800px">
      <l-map ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
          name="OpenStreetMap"></l-tile-layer>
      </l-map>
    </div>
  </div>
</template>


<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      zoom: 2,
    };
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .map {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>