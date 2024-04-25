<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { VBtn, VBtnToggle } from 'vuetify/components';

let props = defineProps<{
    names?: Array<String>
    icons?: []
}>();

let displaySelection = ref(true);

onMounted(() => {

});
</script>


<template>
    <div>
        <v-btn-toggle class="filter" v-model="displaySelection" background-color="primary" dark multiple>
            <!-- <v-btn v-for="(name, index) in props.names" :key="index" :value="name" :icon="props.icons[index]"></v-btn> -->
            <v-btn value="radioactive" icon="mdi-radioactive"></v-btn>
            <v-btn value="air" icon="mdi-weather-windy"></v-btn>
            <v-btn value="interpol" icon="mdi-police-badge"></v-btn>
            <v-btn value="autobahn" icon="mdi-car"></v-btn>
            <v-btn value="weather_warnings" icon="mdi-weather-lightning-rainy"></v-btn>
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
    height: auto !important;

    z-index: 10000;
}

.v-btn {
    padding: 10px;
}
</style>