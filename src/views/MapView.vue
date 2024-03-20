import '@googlemaps/extended-component-library/overlay_layout.js';

<template>
    <div class="map">
        <h1>Anxiety Map</h1>

        <iframe width="600" height="450" style="border:0" loading="lazy" allowfullscreen
            referrerpolicy="no-referrer-when-downgrade" 
            src="https://www.google.com/maps/embed/v1/place?key=API_KEY
            &q=Space+Needle,Seattle+WA">
        </iframe>
        <!--https://developers.google.com/maps/documentation/embed/embedding-map?hl=de-->
    </div>

</template>

<style>
@media (min-width: 1024px) {
    .map {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>