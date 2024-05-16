<script setup>

import MapComponent from "@/components/MapComponent.vue"
import FilterComponent from "@/components/FilterComponent.vue";
import "leaflet/dist/leaflet.css";
import { ref } from 'vue';


const url = "https://api.risiko-radar.info/map";
const filter = ref([]);

</script>


<template>
  <FilterComponent :icons="filter_icons" v-model="filter" />

  <MapComponent :start_lon="51.163361" :start_lat="10.447683" :zoom_start="6" :url="url" :filter="filter"/>
</template>
