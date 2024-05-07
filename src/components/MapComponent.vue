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
const polygons = ref([]);

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

    map.value.on("moveend", function () {
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
        polygon.on('mouseover', function () {
            polygon.setStyle({fillOpacity: 0.7});
        });
        polygon.on('mouseout', function () {
            polygon.setStyle({fillOpacity: 0.2});
        });
        polygon.on('click', function () {
            dashboardInfoService.fetchMapDetailsById(item.id).then(
                (response) => {
                    console.log(response);
                    selectedWarning.value = response;
                    showDetails.value = !showDetails.value;
                });
        });

        polygons.value.push({id: item.id, polygon: polygon, itemColor: item_color});
    });
}

function checkVisiblePolygons() {
    const mapBounds = map.value.getBounds();
    visibleInfos.value = data.value.filter(warning => {
        const polygon = L.polygon(warning.area);
        return mapBounds.intersects(polygon.getBounds());
    });
}

function highlightArea(cardId) {
    const polygonData = polygons.value.find(polygon => polygon.id === cardId);
    const polygon = polygonData.polygon;
    console.log()
    if (polygon) {
        polygon.setStyle(
            {color: '#000000',
                fillColor: polygonData.itemColor,
                fillOpacity: 0.7}
        );
    }
}

function unhighlightArea(cardId) {
    const polygonData = polygons.value.find(polygon => polygon.id === cardId);
    const polygon = polygonData.polygon;
    if (polygon) {
        polygon.setStyle({
                color: polygonData.itemColor,
                fillOpacity: 0.2
        });
    }
}

watch(props, async () => {
    console.log("watcher");
    updateMap();
});
</script>


<template>
    <v-btn style="box-shadow: none; margin-left: 1vh; position: absolute; top: 15vh; z-index: 1000;" icon
           @click="showWarningsList = true;">
        <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <div id="map"></div>
    <SideView :cardInfoDetails="selectedWarning" v-model="showDetails"></SideView>
    <WarningsList v-model="showWarningsList" :warning-cards="visibleInfos"
                  @go-back="showWarningsList = false;"
                  @highlight-area="highlightArea"
                  @unhighlight-area="unhighlightArea">
    </WarningsList>
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