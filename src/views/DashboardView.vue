<script setup lang="ts">

// --- MATERIAL IMPORTS ---
// import {md-list-item, md-list} from '@material/list';

// --- ICONS ---
// import WeatherIcon from './icons/IconWeather.vue'

// --- COMPONENTS ---
import DashboardEntry from '@/components/dashboard/DashboardEntry.vue'

const entries = {
  natural_disasters:
  {
    // purple
    color: "#800080",
    icon: "weather-icon",
    title: "Natural Disasters",
    data: {
      "Deutschland": "Hochwasser",
      "Panama": "Erdbeben",
      "Stuttgart": "its raining, man",
      "München": "flood"
    }

  },
  interpol_red_notice: {
    color: "#aa2020",
    icon: "red-notice-icon",
    title: "Interpol Red Notice",
    data: {
      "Deutschland": "Kevin, 20 Jahre, zuletzt gesehen beim Kuchen essen",
      "Panama": "Maximilian bvs, 19 Jahre, Steuerhinterziehung",
    }
  }
};
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <DashboardEntry v-for="(entry, key) in entries" :key="key" :entry="entry" />
  </div>

  <md-list style="max-width: 300px;">
    <md-list-item>
      Fruits
    </md-list-item>
    <md-divider></md-divider>
    <md-list-item>
      Apple
    </md-list-item>
    <md-list-item>
      Banana
    </md-list-item>
    <md-list-item>
      <div slot="headline">Cucumber</div>
      <div slot="supporting-text">Cucumbers are long green fruits that are just as long as this multi-line description
      </div>
    </md-list-item>
    <md-list-item interactive href="https://google.com/search?q=buy+kiwis&tbm=shop" target="_blank">
      <div slot="headline">Shop for Kiwis</div>
      <div slot="supporting-text">This will link you out in a new tab</div>
      <md-icon slot="end">open_in_new</md-icon>
    </md-list-item>
  </md-list>
</template>

<style>
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

:root {
  background-color: #f4fbfa;
  --md-list-container-color: #f4fbfa;
  --md-list-item-label-text-color: #161d1d;
  --md-list-item-leading-icon-color: #006a6a;
  --md-list-item-trailing-icon-color: #006a6a;
  --md-list-item-leading-icon-size: 20px;
  --md-list-item-trailing-icon-size: 20px;
}

md-list-item.unhealthy {
  --md-list-item-trailing-icon-color: #ba1a1a;
}
</style>
