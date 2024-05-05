<script setup>

import { VBtn, VBtnToggle } from 'vuetify/components';



let props = defineProps({
  names: [],
  icons: [],
})


const filter = defineModel({default: null});

</script>


<template>
    <div>
        <v-btn-toggle class="filter" v-model="filter" background-color="primary" dark multiple>
            <!-- <v-btn v-for="(name, index) in props.names" :key="index" :value="name" :icon="props.icons[index]"></v-btn> -->
            <!-- <v-btn value="radioactive" icon="mdi-radioactive"></v-btn>
            <v-btn value="air" icon="mdi-weather-windy"></v-btn> -->
            <v-btn style="height:8vh; width:8vh; border: var(--dark-mode-text) solid 2px; border-radius: 15%; background-color: var(--dark-mode-lighter-bg); margin: 1vh 0; color: var(--dark-mode-text);" value="nina" icon="mdi-police-badge"></v-btn> <!-- interpol -->
            <v-btn style="height:8vh; width:8vh; border: var(--dark-mode-text) solid 2px; border-radius: 15%; background-color: var(--dark-mode-lighter-bg); margin: 1vh 0; color: var(--dark-mode-text);" value="street_report" icon="mdi-car"></v-btn>
            <v-btn style="height:8vh; width:8vh; border: var(--dark-mode-text) solid 2px; border-radius: 15%; background-color: var(--dark-mode-lighter-bg); margin: 1vh 0; color: var(--dark-mode-text);" value="weather" icon="mdi-weather-lightning-rainy"></v-btn>
        </v-btn-toggle>
    </div>
</template>

<style>

.filter{
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    position: absolute;
    bottom: 0;
    right: 0;
    margin: 2vh 2vh;
    height: auto !important;

    z-index: 10000;
}
</style>