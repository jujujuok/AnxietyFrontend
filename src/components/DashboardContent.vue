<template>
    <v-main class="main-container">
        <v-row class="mb-4" align="start">
            <v-col
                    cols="12"
                    class="d-flex justify-space-between"
            >
                <div class="button-container" v-if="props.type === 'food-product-warnings'">
                    <SelectedButton
                            v-for="btn in getSelectedButtonValues()"
                            :key="btn.value"
                            :value="btn.value"
                            :selected="selected"
                            @update:selected="updateSelected"
                    >
                        {{ btn.label }}
                    </SelectedButton>
                </div>
                <v-select
                    v-if="props.type === 'food-product-warnings'"
                    v-model="selectedArea"
                    :items="setSelectButtonContent(props.type)"
                    :label="selectLabel"
                    class="select-area"
                ></v-select>
                <v-select
                    v-if="props.type === 'embassies'"
                    v-model="selectedCountry"
                    :items="setSelectButtonContent(props.type)"
                    :label="selectLabel"
                    class="select-area"
                ></v-select>
                <v-select
                        v-if="props.type === 'food-product-warnings'"
                        v-model="selectedOrder"
                        label="Reihenfolge"
                        :items="['Aufsteigend', 'Absteigend']"
                        class="select-area"
                        @update:model-value="sortData"
                ></v-select>
            </v-col>
        </v-row>
        <v-container fluid>
            <!--TODO check why isSorting doesn't show a loading indicator-->
            <v-row v-if="isLoading || isSorting" class="loading-indicator-row">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-row>
            <v-row v-else>
                <v-col
                        v-for="cardInfo in cardInfos"
                        :key="cardInfo.id"
                        cols="12"
                >
                    <v-card style="padding: 0 10px;" @click="openSideView(cardInfo)">
                        <table style="display: flex; padding: 2vh; align-items: center; justify-content: space-between;">
                            <td>
                                <div style="display: flex; align-items: center;">
                                    <v-icon style="margin-right: 1vh;">
                                        {{ setIcon(cardInfo.type) }}
                                    </v-icon>
                                    <v-list-item-title style="white-space: normal;" :title="cardInfo.title">{{ formatTitle(cardInfo) }}</v-list-item-title>
                                </div>
                            </td>
                            <td>
                                <v-list-item-subtitle v-if="cardInfo.hasOwnProperty('publishedDate')" class="time-text">{{
                                        formatPublishedDate(parseInt(cardInfo.publishedDate))
                                    }}
                                </v-list-item-subtitle>
                            </td>
                        </table>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
    <SideView :cardInfoDetails="selectedCard" v-model="showDetails"></SideView>
</template>

<script setup>
import countries, {getNames} from "i18n-iso-countries";
import deLocale from 'i18n-iso-countries/langs/de.json';
import SelectedButton from "@/components/SelectedButton.vue";
import DashboardInfoService from "@/services/dashboard-info-service.js";
import SideView from "@/components/SideView.vue";
import {computed, onBeforeMount, ref, watch} from 'vue';
import {onBeforeRouteUpdate} from "vue-router";
import {formatDistanceToNow} from "date-fns";
import {de} from "date-fns/locale";
import DataManager from "@/services/data-manager.js";

//Register country language to german
countries.registerLocale(deLocale);

const props = defineProps({
    type: String,
    required: Boolean
});

const dataManager = new DataManager();
const cardInfos = ref([]);
const selectedCard = ref({});
const showDetails = ref(false);
const selectedArea = ref(null);
const selectedCountry = ref(null);
const selectedOrder = ref('Aufsteigend');
let selected = ref(getSelectedButtonValues()[0].value);
let isLoading = ref(false);
let isSorting = ref(false);

async function updateSelected(newValue) {
    selected.value = newValue;
    filterData();
}

const APIType = {
    'travel-warnings': 'travel_warning',
    'food-product-warnings': ['food_warning', 'product_warning'],
    'embassies': 'embassy',
    'interpol': 'interpol_red'
};

const selectLabel = computed(() => {
    return props.type === 'food-product-warnings' ? 'Bundesländer' : 'Länder';
});

function formatPublishedDate(publishedDate) {
    return formatDistanceToNow(new Date(publishedDate), {addSuffix: true, locale: de});
}

function formatTitle(card) {
    if (props.type === "embassies" && card.hasOwnProperty('country')) {
        return `${card.country} - ${card.title}`;
} else if(props.type === 'travel-warnings' && card.hasOwnProperty('country') && card.hasOwnProperty('severity')){
        return `${card.country} - ${card.severity}`;
    }
    return card.title;
}

function getSelectedButtonValues() {
    switch (props.type) {
        case 'food-product-warnings':
            return [
                {value: 'all', label: 'Alle Warnungen'},
                {value: 'food', label: 'Lebensmittel'},
                {value: 'product', label: 'Produktwarnungen'}
            ];
        default:
            return [
                {value: 'worldwide', label: 'Weltweit'},
                {value: 'europe', label: 'Europa'}
            ];
    }
}

async function sortData() {
    isSorting.value = true;
    if (selectedOrder.value === 'Absteigend') {
        cardInfos.value.sort((a, b) => parseInt(a.publishedDate) - parseInt(b.publishedDate));
    } else {
        cardInfos.value.sort((a, b) => parseInt(b.publishedDate) - parseInt(a.publishedDate));
    }
    isSorting.value = false;
}

function setSelectButtonContent(dashboardType) {
    switch (dashboardType) {
        case 'food-product-warnings':
            return [
                'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg',
                'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen',
                'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'
            ];
        default:
            return Object.entries(getNames('de')).map(([key, value]) => value);
    }
}

function setIcon(cardType) {
    switch (cardType) {
        case 'travel_warning':
            return 'mdi-airplane-takeoff';
        case 'food_warning':
            return 'mdi-food-apple';
        case 'product_warning':
            return 'mdi-package-variant';
        case 'country_representative':
            return 'mdi-briefcase-account';
        case 'interpol_red':
            return 'mdi-account-search';
        case 'embassy':
            return 'mdi-bank';
        default:
            return 'mdi-alert';
    }
}

function openSideView(cardInfo) {
    try {
        if (cardInfo.id != null && !dataManager.doDashboardDetailsExist(cardInfo.id)) {
            DashboardInfoService.fetchCardDetailsById(cardInfo.id).then(
                (response) => {
                    selectedCard.value = response;
                    if(cardInfo.hasOwnProperty('area')){
                        selectedCard.value.area = cardInfo.area;
                    }
                    showDetails.value = true;
                    dataManager.appendDashboardDetails(cardInfo.id, response);
                }
            );
        }else {
            selectedCard.value = dataManager.getDashboardDetails(cardInfo.id);
            showDetails.value = true;
        }
    } catch (error) {
        console.error('Error fetching card details:', error);
    }
}

function filterData() {
    const filters = APIType[props.type];
    const unfilteredData = dataManager.getDashboardData()

    //if the dashboard is for food and product warnings
    if (props.type === 'food-product-warnings') {
        switch (selected.value) {
            case 'food':
                // console.log(cardInfos.value);
                cardInfos.value = unfilteredData.filter((card) => selectedArea.value ? card.type === filters[0] && card.area.includes(selectedArea.value) : card.type === filters[0]);
                break;
            case 'product':
                cardInfos.value = unfilteredData.filter((card) => card.type === filters[1]);
                break;
            case 'all':
            default:
                cardInfos.value = unfilteredData.filter((card) => (selectedArea.value ? card.type === filters[0] && card.area.includes(selectedArea.value) : card.type === filters[0]) || card.type === filters[1]);
                break;
        }
    } else if(props.type === 'embassies') {
        cardInfos.value = unfilteredData.filter((card) => selectedCountry.value ? card.type === filters && card.country === selectedCountry.value : card.type === filters);
    } else {
        cardInfos.value = unfilteredData.filter((card) => card.type === filters);
    }
}

async function loadData() {
    try {
        isLoading.value = true;
        dataManager.saveDashboardData(await DashboardInfoService.getDashboardInfos());

        filterData();
        sortData();

    } catch (error) {
        console.error('Error fetching dashboard infos:', error);
    } finally {
        isLoading.value = false;
    }
}

onBeforeRouteUpdate(async () => {
    selected.value = getSelectedButtonValues()[0].value;
    loadData();
});

onBeforeMount(async () => {
    selected.value = getSelectedButtonValues()[0].value;
    loadData();
});

//Look for updates every 5 minutes
setInterval(() => {
    dataManager.synchronizeDashboardData();
    cardInfos.value = dataManager.getDashboardData();
    filterData();
    sortData();

}, 300000);

watch(selectedArea, () => {
    filterData();
    sortData();
});

watch(selectedCountry, () => {
    filterData();
});
</script>

<style scoped>
.loading-indicator-row {
    display: flex;
    justify-content: center;
    align-items: center;
}

.time-text {
    white-space: nowrap;
}

.v-list-subheader__text {
    white-space: normal;
    font-weight: bold;
}

.v-application__wrap {
    background-color: var(--dark-mode-bg);
}

.main-container {
    margin-top: 10vh;
    padding: 3vh;
    border-radius: 10px;
    background-color: var(--dark-mode-lighter-bg);
}

.button-container {
    display: flex;
    justify-content: space-between;
}

.select-area {
    max-width: 30vh;
}
</style>
