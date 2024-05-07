<template>
    <v-navigation-drawer style="width: 60vh;" v-model="showWarnings" permanent fixed clipped location="left" app>
        <nav style="display: flex; align-items: center;">
            <v-btn style="box-shadow: none; margin-right: 1vh;" icon @click="$emit('goBack')">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title>Warnungen</v-toolbar-title>
        <v-select
            style="max-width: 50%; margin-top: 1vh;"
            v-model="selectedOrder"
            :items="['Aufsteigend', 'Absteigend']"
            class="select-area"
            @update:model-value="console.log('Sort by time')"
        ></v-select>
        </nav>
        <v-list dense>
            <v-card
                :style="{ backgroundColor: typeColor[card.type], padding: '2vh', margin: '1vh 3vh' }"
                v-for="card in warningCards" :key="card.id"
                @click="selectCard(card)"
                @mouseover="$emit('highlightArea', card.id);"
                @mouseout="$emit('unhighlightArea', card.id);"
            >
                  <v-list-item-title style="white-space: normal; color: var(--dark-mode-bg);">{{ card.title }}</v-list-item-title>
            </v-card>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    warningCards: Array
});

const typeColor = {
    "nina": "#6D6BFF",
    "weather": "#358435",
    "street_report": "#853F7F",
    "default": "#DA5450"
}

const showWarnings = ref(true);
const selectedOrder = ref('Aufsteigend');

function selectCard(card) {
    console.log('Selected card:', card);
}
</script>

<style scoped>
.v-navigation-drawer {
    width: 250px;
    height: 100%;
    box-shadow: 0 2px 12px rgba(0,0,0,0.2);
}

.v-list-item {
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.v-list-item:hover {
    background-color: #f0f0f0;
}

.v-list-item-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>