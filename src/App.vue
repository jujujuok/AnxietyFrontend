<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Home from './components/Home.vue'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/map">Map</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
  </header>

  <RouterView style="margin-bottom: 50px;" />
</template>

<style scoped>
RouterLink {
  color: var(--color-text);
  text-decoration: none;
  padding: 1rem;
  border-left: 1px solid var(--color-border);
  font-size: 18px;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  background-color: #cc503b;
  align-items: center;
  padding:1rem;
}

nav {
  width: 100%;
  font-size: 18px;
  text-align: center;
  margin-top: 2rem;
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
./components/Home.vue