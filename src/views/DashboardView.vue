<script setup lang="ts">

// --- MATERIAL IMPORTS ---
import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/button/outlined-button'
import SelectedButton from "@/components/SelectedButton.vue";
import { ref } from 'vue';

abstract class DashboardItemStruct {
    color: string = "#aaaaaa"
    icon: string = "default-icon"
    iid: number
    title: string
    date: Date
    description: string
    location: string

    constructor(iid: number, title: string, date: Date, description: string, location: string) {
        this.iid = iid
        this.title = title
        this.date = date
        this.description = description
        this.location = location
    }
}

class WeatherStruct extends DashboardItemStruct {
    constructor(iid: number, title: string, date: Date, description: string, location: string) {
        super(iid, title, date, description, location)
        this.color = "#800080"
        this.icon = "weather-icon"
    }
}

class InterpolRedNoticeStruct extends DashboardItemStruct {
    constructor(iid: number, title: string, date: Date, description: string, location: string) {
        super(iid, title, date, description, location)
        this.color = "#aa2020"
        this.icon = "red-notice-icon"
    }
}


const entries = [
    new WeatherStruct(1, "Hochwasser", new Date(), "Es regnet in Deutschland", "Deutschland"),
    new WeatherStruct(2, "Erdbeben", new Date(), "Es regnet in Panama", "Panama"),
    new InterpolRedNoticeStruct(3, "Kevin", new Date(), "20 Jahre, zuletzt gesehen beim Kuchen essen", "Deutschland"),
    new InterpolRedNoticeStruct(4, "Maximilian bvs", new Date(), "19 Jahre, Steuerhinterziehung", "Panama")
];

const items = [
    { text: 'In der Nähe', value: 'nearby' },
    { text: 'Deutschland', value: 'germany' },
    { text: 'Bundesland', value: 'state' }
];

const selected = ref('nearby');
</script>

<template>
    <SelectedButton
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :selected="selected"
        @update:selected="selected = $event"
    >
        {{ item.text }}
    </SelectedButton>
</template>

<style scoped>
.icon {
    fill: var(--dark-mode-text);
}
</style>
