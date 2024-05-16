<script setup>

import Home from '@/components/Home.vue'

</script>

<template>
  <Home msg="Welcome to the Risiko-Radar" />

  <div class="text home">
    <h1 class="text-highlight">Home</h1>
    <p>This is a project from some students from the
      <a href="https://www.getdigital.de/web/img/products/1100x1100/Aufkleber_Trollface.220426.webp">dhbw-stuttgart</a>
      university.
    </p>

    <br>

    <h2 class="text-highlight">Disclaimer</h2>
    <p>
      The author assumes no liability for the topicality, correctness, completeness or quality of the information
      provided.
    </p>

    <br>

    <h2 class="text-highlight">Some of the APIs used include:</h2>
    <ul>
      <li>Autobahn API</li>
      <li>Deutscher Wetterdienst API</li>
      <li>Hochwasser API</li>
      <li>Interpol Notices API</li>

      <li>Lebensmittel und Produktwarnungen</li>
      <li>Luftqualität API - Umweltbundesamt</li>
      <li>NINA API
        <ul>
          <li>Polizeimeldungen</li>
          <li>Unwetterwarnungen</li>
          <li>Deutscher Wetterdienst</li>
          <li>Katwarn</li>
          <li>Biwapp</li>
        </ul>
      </li>
      <li>Bundesamt für Strahlenschutz - ODL-Info API</li>
      <li>Auswärtiges Amt</li>
    </ul>
  </div>

</template>


<style scoped>
.home {
  padding: 1rem;
}
</style>