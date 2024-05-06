<script setup>

import {ref, onMounted, watch} from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';
import DataManager from "@/services/data-manager.js";
import SideView from "@/components/SideView.vue";
import dashboardInfoService from "@/services/dashboard-info-service.js";
import WarningsList from "@/components/WarningsList.vue";

let props = defineProps({
    start_lon: Number,
    start_lat: Number,
    zoom_start: Number,
    url: String,
    filter: [],
})
const dataManager = new DataManager();
const showDetails = ref(false);
const showWarningsList = ref(true);
const selectedWarning = ref({});
const data = ref([]);
const visibleInfos = ref([]);

async function callApi(url) {
    try {
        const headers = {
            'accept': 'application/json'
        };

        const response = await fetch(url, {headers});
        console.log(response);

        if (response.ok) {
            return await response.json();
        }
    } catch (e) {
        console.error('Error while fetching map data: ', e);
    }
}

const map = ref(L.Map);


onMounted(async () => {
    map.value = L.map('map').setView([props.start_lon, props.start_lat], props.zoom_start);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value);

    map.value.on("moveend", function (e){
        checkVisiblePolygons();
    });

    updateMap();
    checkVisiblePolygons();
});

function updateMap() {
    if (!props.filter) return;

    callApi(props.url).then(data => dataManager.saveMapData(data));
    data.value = dataManager.getMapData();

    data.value.forEach(item => {
        let item_color = 'red';
        let pop = item.title;
        let coords = [[item.area.map(innerArray => innerArray.map(coord => coord.reverse()))]];
        console.log("filter: ", props.filter, "item type: ", item.type)

        switch (item.type) {
            case "nina":
                item_color = 'blue';
                break;
            case "weather":
                item_color = 'green';
                break;
            case "street_report":
                item_color = 'purple';
                break;
            default:
                item_color = 'red';
                break;
        }

        const polygon = L.polygon(coords, {color: item_color}).addTo(map.value);
        polygon.bindPopup(pop);
        polygon.on('mouseover', function (e) {
            polygon.setStyle({fillOpacity: 0.7});
        });
        polygon.on('mouseout', function (e) {
            polygon.setStyle({fillOpacity: 0.2});
        });
        polygon.on('click', function (e) {
            dashboardInfoService.fetchMapDetailsById(item.id).then(
                (response) => {
                    console.log(response);
                    selectedWarning.value = response;
                    showDetails.value = !showDetails.value;
                });
        });
    });
}

function checkVisiblePolygons() {
    const mapBounds = map.value.getBounds();
    visibleInfos.value = data.value.filter(warning => {
        const polygon = L.polygon(warning.area);
        return mapBounds.intersects(polygon.getBounds());
    });

    console.log("Visible Warnings:", visibleInfos.value);
}

watch(props, async () => {
    console.log("watcher");
    updateMap();
});
</script>


<template>
    <v-btn style="box-shadow: none; margin-right: 1vh; position: absolute; top: 15vh; background-color: transparent; z-index: 1000;" icon @click="showWarningsList = true;">
        <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <div id="map"></div>
    <SideView :cardInfoDetails="selectedWarning" v-model="showDetails"></SideView>
    <WarningsList v-model="showWarningsList" :warning-cards="visibleInfos" @go-back="showWarningsList = false;"></WarningsList>
</template>

<style>
#map {
    height: 100%;
}

@media (min-width: 1024px) {
    .map {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>