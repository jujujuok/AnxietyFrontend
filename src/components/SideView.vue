<template>
    <v-navigation-drawer style="width: 50vh;" v-model="showDetails" location="right">
        <v-card class="ma-5 pa-4" outlined>
            <v-img
                    :src="cardInfoDetails.image"
                    height="200px"
                    class="white--text align-end"
                    gradient="to top right, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
            </v-img>
            <v-card-text>
                <v-list>
                    <v-list-item>
                        <v-icon>mdi-alert-octagon</v-icon>
                        {{ cardInfoDetails.description }}
                    </v-list-item>
                    <v-list-item>
                        <v-icon>mdi-map-marker</v-icon>
                        {{ cardInfoDetails.area && Array.isArray(cardInfoDetails.area) ? cardInfoDetails.area.join(', ') : 'No areas specified' }}
                    </v-list-item>
                    <v-list-item>
                        <v-icon>mdi-factory</v-icon>
                        {{ cardInfoDetails.manufacturer }}
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-action>
                            <v-btn :href="cardInfoDetails.link" text color="primary" style="width: 100%;">
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
import { ref, defineProps } from 'vue';
import DashboardInfoService from "@/services/dashboard-info-service.js";

const props = defineProps({
    cardInfoDetails: {
        description: String,
        area: Array(String),
        link: String,
        manufacturer: String,
        image: String
    },
    showDetails: Boolean
});

console.log(props.cardInfoDetails.area);

const fetchCardInfo = async (id) => {
    DashboardInfoService.fetchCardDetailsById(id)
        .then(response => {
            setCardInfo(response.data);
        })
        .catch(error => {
            console.error(`Error while fetching card details: ${error}`);
        });
}

const setCardInfo = (data) => {
    props.cardInfoDetails.value = {
        description: `Representative for ${data.country}`,
        area: [data.country],
        link: '',  // Assuming there's no specific link in the response
        manufacturer: '',  // Assuming no manufacturer information
        image: data.image
    }
}

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
