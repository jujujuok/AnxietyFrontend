<template>
    <v-navigation-drawer style="width: 50vh;" v-model="showDetails" location="right">
        <v-card class="ma-5 pa-4" outlined>
            <v-img
                    :src="data.details.image"
                    height="200px"
                    class="white--text align-end"
                    gradient="to top right, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
            </v-img>
            <v-card-text>
                <v-list>
                    <v-list-item>
                        <v-icon>mdi-alert-octagon</v-icon>
                        {{ data.description }}
                    </v-list-item>
                    <v-list-item>
                        <v-icon>mdi-map-marker</v-icon>
                        {{ data.area.join(', ') }}
                    </v-list-item>
                    <v-list-item>
                        <v-icon>mdi-factory</v-icon>
                        {{ data.details.manufacturer }}
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-action>
                            <v-btn :href="data.details.link" text color="primary" style="width: 100%;">
                                More Info
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-navigation-drawer>
</template>

<script setup>
import {ref} from 'vue';

const data = ref({
    "type": "food_warning",
    "title": "Hautbleichmittel „Clinic Clear, Whitening Body Lotion\" der Marke „dodo cosmetics“",
    "description": "Hydrochinon und Clobetasolpropionat",
    "area": ["Bayern"],
    "details": {
        "link": "https://www.lebensmittelwarnung.de/bvl-lmw-de/detail/kosmetische+mittel/75142",
        "manufacturer": "Fa. Sandra Afro Shop",
        "image": "https://www.lebensmittelwarnung.de/bvl-lmw-de/opensaga/attachment/5ed7765c-badf-4761-bc46-85ab2e7018ee/Produktbild1.png"
    }
});

const showDetails = ref(false);
</script>

<style scoped>
.topic-container {
    display: flex;
    align-items: center;
}

.topic-content {
    display: flex;
    align-items: center;
}

.topic-title {
    margin-left: 10px;
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
