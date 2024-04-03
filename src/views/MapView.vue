<template>
  <div>
    <h1 class="green">Anxiety Map</h1>
    <div id="container">
      <div id="map" style="height:80vh;"></div>
      <!--
        Build an interactive Map:
        https://medium.com/@smhabibjr/implement-an-interactive-map-in-the-vue-js-8a865010fb41
      -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';




var unwetter = [
  [
    [
      8.0513,
      48.2218
    ],
    [
      8.07,
      48.2272
    ],
    [
      8.0843,
      48.2221
    ],
    [
      8.0678,
      48.2186
    ],
    [
      8.071,
      48.2131
    ],
    [
      8.0815,
      48.2131
    ],
    [
      8.0827,
      48.2045
    ],
    [
      8.057,
      48.2045
    ],
    [
      8.0584,
      48.2161
    ],
    [
      8.0515,
      48.2161
    ],
    [
      8.0513,
      48.2218
    ]
  ].map(array => array.reverse()),
  [
    [
      8.0557,
      48.6751
    ],
    [
      8.0743,
      48.6726
    ],
    [
      8.0661,
      48.6668
    ],
    [
      8.0681,
      48.6541
    ],
    [
      8.0575,
      48.6548
    ],
    [
      8.0557,
      48.6751
    ]


  ].map(array => array.reverse()),
  [

    [
      8.3647,
      47.9725
    ],
    [
      8.3668,
      47.9831
    ],
    [
      8.3724,
      47.9806
    ],
    [
      8.3802,
      47.9777
    ],
    [
      8.3797,
      47.9662
    ],
    [
      8.3647,
      47.9725
    ]

  ].map(array => array.reverse())
]


const map = ref(null);

onMounted(() => {
  map.value = L.map('map').setView([51.163361, 10.447683], 6);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map.value);

  L.marker([50.0000, 8.6821]).addTo(map.value);
  L.marker([49.1234, 8.6821],).addTo(map.value);

  // L.polygon(latlngs2, { color: 'blue' }).addTo(map.value);
  // L.polygon(latlngs, { color: 'red' }).addTo(map.value);

  unwetter.forEach(coords => {
    const polygon = L.polygon(coords, { color: 'red' }).addTo(map.value);

      // Bind popup
      polygon.bindPopup('This is a polygon');

      // // Hover effect
      polygon.on('mouseover', function (e) {
        this.setStyle({ fillOpacity: 0.7 });
      });
      polygon.on('mouseout', function (e) {
        this.setStyle({ fillOpacity: 0.2 });
      });
  });
});

</script>


<style>
#mapContainer {
  min-height: 69vh;
  display: flex;
  align-items: center;
}

@media (min-width: 1024px) {
  .map {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>