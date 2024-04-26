<script setup>

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

    console.log("Coordinate Format: ", coordinates);


const url = "http://api.risiko-radar.info/map";

</script>


<template>
  <FilterComponent :names="filter_names" :icons="filter_icons" />

  <div id="container">
    <MapComponent :start_lon="51.163361" :start_lat="10.447683" :zoom_start="6" :areas="coordinates" :url="url" />
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