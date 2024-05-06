<template>
    <v-navigation-drawer style="width: 60vh;" v-model="showDetails" location="right">
        <v-card class="ma-5 pa-4" outlined>
            <v-img
                :src="cardInfoDetails.image"
                height="200px"
                class="white--text align-end"
                gradient="to top right, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                v-if="cardInfoDetails.hasOwnProperty('image')"
            ></v-img>
            <v-card-text>
                <v-list>
                    <template v-for="(value, key) in cardInfoDetails">
                        <v-list-item v-if="value && key !== 'image' && key !== 'link' && key !== 'type'">
                            <v-icon :icon="iconMapping[key]"></v-icon>
                            <span class="topic-title">{{ germanTranslations[key] }}:</span>
                            {{ formatValue(key, value) }}
                        </v-list-item>
                    </template>
                    <v-list-item>
                        <v-list-item-action>
                            <v-btn v-if="cardInfoDetails.hasOwnProperty('link')" :href="cardInfoDetails.link" text color="primary" style="width: 100%; font-size: 10px;">
                                Weitere Informationen
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-navigation-drawer>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    cardInfoDetails: Object,
    showDetails: Boolean
});

const iconMapping = {
    description: 'mdi-alert-octagon',
    area: 'mdi-map-marker',
    country: 'mdi-map-marker',
    manufacturer: 'mdi-factory',
    first_name: 'mdi-account',
    last_name: 'mdi-account',
    hazard: 'mdi-alert-circle',
    injury: 'mdi-hospital',
    link: 'mdi-link',
    category: 'mdi-tag',
    affectedProducts: 'mdi-package-variant-closed',
    instruction: 'mdi-alert',
};

const germanTranslations = {
    description: 'Beschreibung',
    area: 'Gebiet',
    country: 'Land',
    manufacturer: 'Hersteller',
    first_name: 'Vorname',
    last_name: 'Nachname',
    hazard: 'Gefahr',
    injury: 'Verletzung',
    link: 'Link',
    category: 'Kategorie',
    affectedProducts: 'Betroffene Produkte',
    instruction: 'Anweisung'
};

const formatValue = (key, value) => {
    if (key === 'area' && Array.isArray(value)) {
        return value.join(', ');
    }
    return value;
};

const showDetails = ref(false);
</script>

<style scoped>
.topic-title {
    font-weight: bold;
}

.topic-container {
    display: flex;
    align-items: center;
}

.topic-content {
    display: flex;
    align-items: center;
}

.v-list-item {
    border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.v-list-item:last-child {
    border-bottom: none;
}

.v-card-title {
    background: rgba(0, 0, 0, 0.5);
}
</style>
