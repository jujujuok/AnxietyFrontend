<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { VIcon } from 'vuetify/components'; // Import v-icon
</script>

<template>
  <v-app id="anxiety">
    <footer>
      <nav>
        <RouterLink to="/"><v-icon icon="mdi-home-variant"></v-icon></RouterLink>
        <RouterLink to="/map"><v-icon icon="mdi-map"></v-icon></RouterLink>
        <RouterLink to="/dashboard"><v-icon icon="mdi-chart-box"></v-icon></RouterLink>
      </nav>
    </footer>


  <RouterView style="margin-bottom: calc(60px + 1rem);" />
  </v-app>
</template>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
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
