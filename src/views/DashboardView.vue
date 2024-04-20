<template>
    <v-navigation-drawer v-model="drawer">
        <v-list dense>
            <v-list-item title="Dashboard"></v-list-item>
            <v-divider></v-divider>
            <v-list-item link @click="setComponent('FoodProductWarnings')">
                <div class="topic-container">
                    <v-icon class="topic-content">mdi-food-apple</v-icon>
                    <v-list-item-title class="topic-content topic-title">Produkt- und Lebensmittelwarnungen</v-list-item-title>
                </div>
            </v-list-item>
            <v-list-item link @click="setComponent('TravelWarnings')">
                <div class="topic-container">
                    <v-icon class="topic-content">mdi-alert-circle</v-icon>
                    <v-list-item-title class="topic-content topic-title">Reisewarnungen</v-list-item-title>
                </div>
            </v-list-item>
            <v-list-item link @click="setComponent('Embassies')">
                <div class="topic-container">
                    <v-icon class="topic-content">mdi-briefcase-account</v-icon>
                    <v-list-item-title class="topic-content topic-title">Botschaften</v-list-item-title>
                </div>
            </v-list-item>
            <v-list-item link @click="setComponent('Interpol')">
                <div class="topic-container">
                    <v-icon class="topic-content">mdi-account-search</v-icon>
                    <v-list-item-title class="topic-content topic-title">Interpol</v-list-item-title>
                </div>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar style="display: flex; justify-content: start;">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>Dashboard</v-app-bar-title>
        <SearchBar/>
    </v-app-bar>

    <FoodProductWarning v-if="currentComponent === 'FoodProductWarnings'" />
    <TravelWarnings v-else-if="currentComponent === 'TravelWarnings'" />
    <Embassies v-else-if="currentComponent === 'Embassies'" />
    <Interpol v-else-if="currentComponent === 'Interpol'" />
</template>

<style>

.v-list-subheader__text {
    white-space: normal;
    font-weight: bold;
}

.v-application__wrap {
    background-color: var(--dark-mode-bg);
}

.main-container {
    margin: 10vh 0vh 0vh 0vh;
    padding: 3vh;
    border-radius: 10px;
    background-color: var(--dark-mode-lighter-bg);
}

.v-navigation-drawer__scrim {
    opacity: 0.0;
}

.topic-title {
    margin-left: 10px;
    user-select: none;
}

.topic-container {
    display: flex;
}

.topic-content {
    justify-content: space-between;
}

</style>

<script setup>
import {ref} from 'vue'
import SearchBar from "@/components/SearchBar.vue";
import FoodProductWarning from "@/components/FoodProductWarnings.vue";
import TravelWarnings from "@/components/TravelWarnings.vue";
import Embassies from "@/components/Embassies.vue";
import Interpol from "@/components/Interpol.vue";

const drawer = ref(false);
const currentComponent = ref('FoodProductWarnings');
const searchResults = ref([]);

function setComponent(componentName) {
    currentComponent.value = componentName;
    drawer.value = false;}

</script>

<script>
export default {
    data: () => ({
        drawer: null,
        showDetails: false
    }),
}
</script>