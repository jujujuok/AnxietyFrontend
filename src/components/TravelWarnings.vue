<template>
    <v-main class="main-container">
        <v-row class="mb-4" align="start">
            <v-col
                    cols="12"
                    class="d-flex justify-space-between"
            >
                <div class="button-container">
                    <SelectedButton
                            value="worldwide"
                            :selected="selected"
                            @update:selected="updateSelected"
                    >
                        Weltweit
                    </SelectedButton>
                    <SelectedButton
                            value="europe"
                            :selected="selected"
                            @update:selected="updateSelected"
                    >
                        Europa
                    </SelectedButton>
                </div>
                <v-select
                        label="Select"
                        :items="select_button_content"
                        class="select-area"
                ></v-select>
            </v-col>
        </v-row>
        <v-container fluid>
            <v-row>
                <v-col
                        v-for="card_info in cardInfos"
                        :key="card_info.id"
                        cols="12"
                >
                    <v-card style="padding: 0px 10px;" @click="handleCardClick(card_info)">
                        <v-list style="display: flex; padding: 2vh;">
                            <v-icon style="margin-right: 1vh;">
                                mdi-airplane-takeoff
                            </v-icon>
                            <v-list-item-title :title="card_info.title">{{ card_info.title }}</v-list-item-title>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
    <SideView :cardInfoDetails="selectedCard" v-model="showDetails"></SideView>
</template>

<script setup>
import {onBeforeMount, ref} from 'vue';
import SelectedButton from "@/components/SelectedButton.vue";
import DashboardInfoService from "@/services/dashboard-info-service.js";
import SideView from "@/components/SideView.vue";

const selected = ref('all');
const cardInfos = ref([]);
const selectedCard = ref({});
const showDetails = ref(false);

function updateSelected(newValue) {
    selected.value = newValue;
}

const select_button_content = [
    'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg',
    'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen',
    'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'
];

function handleCardClick(cardInfo) {
    selectedCard.value = {
        id: cardInfo.id,
        description: cardInfo.description,
        area: cardInfo.area,
        link: cardInfo.details.link,
        manufacturer: cardInfo.details.manufacturer,
        image: cardInfo.details.image
    };
    showDetails.value = !showDetails.value; // Open the side view
}

onBeforeMount(async () => {
    cardInfos.value = await DashboardInfoService.getDashboardInfos().then(
        //filter the data to only show travel warnings
        (response) => {
            return response.data.filter((card) => card.type === 'travel_warning');
        }
    );
});

cardInfos.value = [{
    "id": 7014,
    "type": "food_warning",
    "title": "Hautbleichmittel „Clinic Clear, Whitening Body Lotion\" der Marke „dodo cosmetics“",
    "description": "Hydrochinon und Clobetasolpropionat",
    "area": [
        "Bayern"
    ],
    "details": {
        "link": "https://www.lebensmittelwarnung.de/bvl-lmw-de/detail/kosmetische+mittel/75142",
        "manufacturer": "Fa. Sandra Afro Shop",
        "image": "https://www.lebensmittelwarnung.de/bvl-lmw-de/opensaga/attachment/5ed7765c-badf-4761-bc46-85ab2e7018ee/Produktbild1.png"
    }
},
    {
        "id": 7005,
        "type": "food_warning",
        "title": "BBQ Gewürzmischung 100g Dose",
        "description": "Nicht gekennzeichnetes Allergen Sesam",
        "area": [
            "Baden-Württemberg",
            "Hamburg",
            "Hessen",
            "Niedersachsen",
            "Rheinland-Pfalz",
            "Sachsen-Anhalt",
            "Schleswig-Holstein"
        ],
        "details": {
            "link": "https://www.lebensmittelwarnung.de/bvl-lmw-de/detail/lebensmittel/75050",
            "manufacturer": "Curry- Gewürzmanufaktur Hafendamm 38 A 24937 Flensburg",
            "image": "https://www.lebensmittelwarnung.de/bvl-lmw-de/opensaga/attachment/a514eb30-31c5-49de-9751-77f67c63d12c/BBQ Gewürzmischung.jpg"
        }
    },
    {
        "id": 20031,
        "type": "food_warning",
        "title": "„KHARTA – Yerba Mate“ mit dem Produktionsdatum (MAF) 10-2021 und dem Mindesthaltbarkeitsdatum (EXP) 09-2024 „KHARTA – Yerba Mate“ mit dem Produktionsdatum (MAF) 11-2021 und dem Mindesthaltbarkeitsdatum (EXP) 10-2024",
        "description": "Es kann nicht ausgeschlossen werden, dass in dem Produkt erhöhte Rückstandsgehalte des Pflanzenschutzmittels Anthrachinon enthalten sind. Auf den Verzehr sollte daher vorsorglich verzichtet werden.",
        "area": [
            "Bayern",
            "Hessen",
            "Niedersachsen",
            "Nordrhein-Westfalen",
            "Sachsen",
            "Sachsen-Anhalt",
            "Thüringen"
        ],
        "details": {
            "link": "https://www.lebensmittelwarnung.de/bvl-lmw-de/detail/lebensmittel/81136",
            "manufacturer": "Fa. Orienta Foods Fa. Yarafood B.V., Enschede, NL",
            "image": "https://www.lebensmittelwarnung.de/bvl-lmw-de/opensaga/attachment/03eb73e7-7a91-4f38-aec4-d6a4cc6cebd0/Produktbild.JPG"
        }
    }
]
</script>

<style scoped>
.v-list-subheader__text {
    white-space: normal;
    font-weight: bold;
}

.v-application__wrap {
    background-color: var(--dark-mode-bg);
}

.main-container {
    margin-top: 10vh;
    padding: 3vh;
    border-radius: 10px;
    background-color: var(--dark-mode-lighter-bg);
}

.button-container {
    display: flex;
    justify-content: space-between;
}

.select-area {
    max-width: 30vh;
}
</style>
