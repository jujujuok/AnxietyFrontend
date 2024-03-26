<script setup lang="ts">
import type { PropType } from 'vue'   // the fck is this?!
import { defineComponent } from 'vue'

// --- MATERIAL IMPORTS ---
import '@material/web/list/list'
import '@material/web/list/list-item'

// --- ICONS ---
// import WeatherIcon from './icons/IconWeather.vue'

// --- COMPONENTS ---
import DashboardEntry from '@/components/DashboardEntry.vue';

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

// export interface RedNoticeDetails extends Record<string, any> {
//   iid: number
//   type: string
//   title: string
//   date: Date
//   description: string
//   location: string
// }
// TODO: Fabi warum funktioniert export default nicht
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>

    <md-list v-if="entries"> <!-- todo: if there are entries -->
      <DashboardEntry v-for="entry in entries" 
      :key="entry.iid" 
      :color="entry.color" 
      :icon="entry.icon" 
      :iid="entry.iid"
      :title="entry.title" 
      :date="entry.date" 
      :description="entry.description"
      :location="entry.location" />
    </md-list>
    <div v-else>
      <p>Keine Katastrophe vorhanden</p>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  gap: 1rem;
  background-color: rgb(39, 183, 255);
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.entry {
  flex: 1;
  background-color: rgb(152, 71, 71);
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

div {
  display: grid;
  place-items: center;
}

p {
  font-size: 0.8rem;
  font-family: 'Roboto Mono', monospace;
}
</style>

<!--
  <script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/icon/icon'
import ResultListItem from '@/components/search-result/ResultListItem.vue'
import type { SearchResult } from '@/views/SearchQuery'
import { useMedia } from '@/Media'


</script>
-->