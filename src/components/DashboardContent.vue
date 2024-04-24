<template>
    <v-main class="main-container">
        <v-row class="mb-4" align="start">
            <v-col
                    cols="12"
                    class="d-flex justify-space-between"
            >
                <div class="button-container">
                    <!-- Dynamically render buttons based on the type -->
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
                        label="Select"
                        :items="setSelectButtonContent(type)"
                        class="select-area"
                ></v-select>
            </v-col>
        </v-row>
        <v-container fluid>
            <v-row>
                <v-col
                        v-for="cardInfo in cardInfos"
                        :key="cardInfo.id"
                        cols="12"
                >
                    <v-card style="padding: 0px 10px;" @click="openSideView(cardInfo.id)">
                        <v-list style="display: flex; padding: 2vh;">
                            <v-icon style="margin-right: 1vh;">
                                {{ setIcon(cardInfo.type) }}
                            </v-icon>
                            <v-list-item-title :title="cardInfo.title">{{ cardInfo.title }}</v-list-item-title>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
    <SideView :cardInfoDetails="selectedCard" v-model="showDetails"></SideView>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import SelectedButton from "@/components/SelectedButton.vue";
import DashboardInfoService from "@/services/dashboard-info-service.js";
import SideView from "@/components/SideView.vue";
import { onBeforeRouteUpdate } from "vue-router";
import { getCountryDataList } from "countries-list";

const props = defineProps({
    type: String,
    required: true
});

let selected = ref(getSelectedButtonValues()[0].value);
const cardInfos = ref([]);
const selectedCard = ref({});
const showDetails = ref(false);

function updateSelected(newValue) {
    selected.value = newValue;
}

const APIType = {
  'travel-warnings': 'travel_warning',
  'food-product-warnings': ['food_waring', 'product_warning'],
  'embassies': 'country_representative',
  'interpol': 'interpol_red'
};

function getSelectedButtonValues() {
    switch(props.type) {
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

function setSelectButtonContent(dashboardType){
    switch (dashboardType) {
        case 'food-product-warnings': return  [
            'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg',
            'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen',
            'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'
        ];
        default: return getCountryDataList().map(
            (countryList) => {
                return countryList.name
            }
        );
    }
}

function setIcon(cardType){
    switch (cardType) {
        case 'travel_warning': return 'mdi-airplane-takeoff';
        case 'food_waring': return 'mdi-food-apple';
        case 'product_warning': return 'mdi-package-variant';
        case 'country_representative': return 'mdi-briefcase-account';
        case 'interpol_red': return 'mdi-account-search';
        default: return 'mdi-alert';
    }
}

function openSideView(id) {
    try {
        if(id != null && id > 0){
            DashboardInfoService.fetchCardDetailsById(id).then(
                (response) => {
                    if(response.hasOwnProperty('details')){
                        console.log(response.details);
                        selectedCard.value = response.details;
                        showDetails.value = true;
                    }
                }
            );
        }
    } catch (error) {
        console.error('Error fetching card details:', error);
    }
}

async function loadData() {
    try {
        const data = await DashboardInfoService.getDashboardInfos();
        const filter = APIType[props.type];
        if(props.type === 'food-product-warnings'){
            cardInfos.value = data.filter((card) => card.type === filter[0] || card.type === filter[1]);
        } else {
            cardInfos.value = data.filter((card) => card.type === filter);
        }
    } catch (error) {
        console.error('Error fetching dashboard infos:', error);
    }
}
onBeforeRouteUpdate(async () => {
    selected = ref(getSelectedButtonValues()[0].value);
    loadData();
});

onBeforeMount(async () => {
    selected = ref(getSelectedButtonValues()[0].value);
    loadData();
});
</script>

<style scoped>
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
