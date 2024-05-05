<script setup>
import {RouterLink, RouterView} from 'vue-router';
import {VIcon} from 'vuetify/components';
import DataManager from "@/services/data-manager.js";

const dataManager = new DataManager();

//Look for updates every 5 minutes
setInterval(() => {
    dataManager.synchronizeDashboardData();
    console.log("Synchronized dashboard data.")
}, 300000);
</script>

<template>
  <v-app id="app-container">
    <footer>
      <nav>
        <RouterLink class="router-button" style="border: 2px solid var(--dark-mode-text);" to="/"><v-icon icon="mdi-home-variant"></v-icon></RouterLink>
        <RouterLink class="router-button" style="border: 2px solid var(--dark-mode-text);" to="/map"><v-icon icon="mdi-map"></v-icon></RouterLink>
        <RouterLink class="router-button" style="border: 2px solid var(--dark-mode-text);" to="/world"><v-icon icon="mdi-earth"></v-icon></RouterLink>
        <RouterLink class="router-button" style="border: 2px solid var(--dark-mode-text);" to="/dashboard"><v-icon icon="mdi-chart-box"></v-icon></RouterLink>
      </nav>
    </footer>

  <RouterView style="margin-bottom: calc(60px + 1rem);" />
  </v-app>
</template>

<style scoped>
.router-button {
    box-shadow: 1px 3px 4px 0 rgba(0, 0, 0, 0.1);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 8.5vh;
    height: 8.5vh;
    border-radius: 15%;
    margin: 0 10px;
    text-decoration: none;
    background-color: var(--dark-mode-lighter-bg);
    color: var(--dark-mode-text);
}

.router-button:hover {
    background-color: #c0c0c0;
}

.router-button:focus {
    background-color: var(--dark-mode-text);
    color: var(--dark-mode-lighter-bg);
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #00000000;
  align-items: center;
  padding: 1rem;
}

nav {
    width: 100%;
    font-size: 18px;
    text-align: center;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}
</style>
