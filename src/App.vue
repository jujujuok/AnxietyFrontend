<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <footer>
      <nav>
        <RouterLink to="/"><VIcon name="co-home"></VIcon></RouterLink>
        <RouterLink to="/map"><VIcon name="co-map"/></RouterLink>
        <RouterLink to="/dashboard"><VIcon name="ri-dashboard-2-line"/></RouterLink>
      </nav>
  </footer>

  <RouterView style="margin-bottom: calc(60px + 1rem);"/>
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
  padding:1rem;
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
