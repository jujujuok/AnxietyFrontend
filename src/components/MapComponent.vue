<script setup>
import { ref, onMounted, watch } from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';
import DataManager from "@/services/data-manager.js";
import SideView from "@/components/SideView.vue";
import WarningsList from "@/components/WarningsList.vue";
import DashboardInfoService from "@/services/dashboard-info-service.js";
import BOUNDARIES from "@/assets/world-administrative-boundaries.json"

let props = defineProps({
    start_lon: Number,
    start_lat: Number,
    zoom_start: Number,
    url: String,
    filter: Array,
});

const showDetails = ref(false);
const showWarning = ref(false);
const selectedWarning = ref({});
const data = ref([]); // All polygons and infos from localStorage
const visibleInfos = ref([]);
const polygons = ref([]); // Currently displayed polygons

const dataManager = new DataManager();

const map = ref(null);

onMounted(async () => {
    localStorage.clear();
    initializeMap();
    await fetchDataAndUpdateMap();
    setAutoUpdate();
});

watch(() => props.filter, async () => {
    await fetchDataAndUpdateMap();
});

// Function to initialize the Leaflet map
function initializeMap() {
    map.value = L.map('map').setView([props.start_lon, props.start_lat], props.zoom_start);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value);
    map.value.on("moveend", checkVisiblePolygons);
}

async function fetchDataAndUpdateMap() {
    if (!props.url) return;
    try {
        const dataFromApi = await callApi(props.url);
        dataManager.saveMapData(dataFromApi);
        data.value = dataManager.getMapData();
        updatePolygons();
        checkVisiblePolygons();
    } catch (error) {
        console.error('Error updating map:', error);
    }
}

async function callApi(url) {
    try {
        const response = await fetch(url, { headers: { 'accept': 'application/json' } });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`API call failed with status ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching map data:', error);
    }
}

function updatePolygons() {
    // Remove existing polygons
    clearPolygons();

    // Add new polygons based on filter
    /**
     * if area in data.values use this, 
     * else: get area from the world-administrative-boundaries.json
     */
    data.value.forEach(item => {
        if (item.hasOwnProperty('area')) {
            // "area" exists, use it
            if (!props.filter.includes(item.type)) return;

            const itemColor = getItemColor(item.type);
            const coords = item.area.map(innerArray => innerArray.map(coord => coord.reverse()));

            const polygon = createPolygon(coords, itemColor, item.title, item.id);
            polygons.value.push({ id: item.id, polygon, itemColor });
        } else if (item.hasOwnProperty("iso3")) {
            // "area" doesn't exist, use iso3 from BOUNDARIES

            const itemColor = 'blue'; // Or default color
            const boundaryData = BOUNDARIES.find(country => country.iso3 === item.iso3);
            if (boundaryData) {
                const coords = reverseCoords(boundaryData.geo_shape.geometry.coordinates);

                const polygon = createPolygon(coords, itemColor, item.country, item.id);
                polygons.value.push({ id: item.id, polygon, itemColor });
            }
            else {
                console.warn("Missing boundary data for iso3:", item.iso3);
            }
        } else {
            console.warn("Missing area or iso3 code for item:", item);
        }
    });
}

function clearPolygons() {
    polygons.value.forEach(({ polygon }) => polygon.remove());
    polygons.value = [];
}

function getItemColor(type) {
    switch (type) {
        case "nina": return 'blue';
        case "weather": return 'green';
        case "street_report": return 'purple';
        default: return 'red';
    }
}

function createPolygon(coords, color, popupText = "", itemId) {
    const polygon = L.polygon(coords, { color }).addTo(map.value);
    polygon.bindPopup(popupText);
    polygon.on('mouseover', () => polygon.setStyle({ fillOpacity: 0.7 }));
    polygon.on('mouseout', () => polygon.setStyle({ fillOpacity: 0.2 }));
    polygon.on('click', () => toggleDetails(itemId));
    return polygon;
}

function reverseCoords(coords) {
    return coords.map(innerArray => {
        if (Array.isArray(innerArray[0])) {
            return reverseCoords(innerArray);
        } else {
            return innerArray.slice().reverse();
        }
    });
}

function checkVisiblePolygons() {
    if(!isWorldMap()){
        const mapBounds = map.value.getBounds();
            visibleInfos.value = data.value.filter(item => {
                if(item.hasOwnProperty('area')){
                    if(item.area.length > 0){
                        const polygon = L.polygon(item.area);
                        return mapBounds.intersects(polygon.getBounds());
                    }
                }
            });
        }
}

function isWorldMap() {
    return props.url.endsWith('world-map');
}

function toggleDetails(cardId) {
    if (!cardId) return;
    if (!dataManager.doMapDetailsExist(cardId)) {
        DashboardInfoService.fetchMapDetailsById(cardId).then(response => {
            selectedWarning.value = response;
            dataManager.appendMapDetails(cardId, response);
        }).catch(error => {
            console.error('Error fetching card details:', error);
        });
    } else {
        selectedWarning.value = dataManager.getMapDetails(cardId);
    }
    showDetails.value = true;
}

function highlightArea(cardId) {
    const polygonData = polygons.value.find(polygon => polygon.id === cardId);
    if (polygonData) {
        polygonData.polygon.setStyle({ color: 'black', fillColor: polygonData.itemColor, fillOpacity: 0.7 });
    }
}

function unhighlightArea(cardId) {
    const polygonData = polygons.value.find(polygon => polygon.id === cardId);
    if (polygonData) {
        polygonData.polygon.setStyle({ color: polygonData.itemColor, fillOpacity: 0.2 });
    }
}

// Function to set automatic update for map data
function setAutoUpdate() {
    setInterval(async () => {
        await dataManager.synchronizeMapData();
        await fetchDataAndUpdateMap();
    }, 300000); // 5 minutes
}
</script>

<template>
    <v-btn v-if="!isWorldMap()" style="box-shadow: none; margin-left: 1vh; position: absolute; top: 15vh; z-index: 1000;" icon
        @click="showWarning = true; console.log(showWarning)">
        <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <div id="map"></div>
    <SideView :cardInfoDetails="selectedWarning" v-model="showDetails"></SideView>
    <WarningsList v-if="!isWorldMap()" v-model="showWarning" :warning-cards="visibleInfos" @go-back="showWarning = false;"
        @highlight-area="highlightArea" @unhighlight-area="unhighlightArea" @show-details="toggleDetails"/>
</template>



<style>
#map {
    height: 100%;
}

@media (min-width: 1024px) {
    #map {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
