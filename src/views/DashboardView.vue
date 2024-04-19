<template>
    <SideView v-model="showDetails"></SideView>
    <v-navigation-drawer v-model="drawer">
        <v-list dense>
            <v-list-item title="Dashboard"></v-list-item>
            <v-divider></v-divider>
            <v-list-item link>
                <div class="topic-container">
                    <v-icon class="topic-content">mdi-food-apple</v-icon>
                    <v-list-item-title class="topic-content topic-title">Produkt- und Lebensmittelwarnungen
                    </v-list-item-title>
                </div>
            </v-list-item>
            <v-list-item link>
                <div class="topic-container">
                    <v-icon class="topic-content">mdi-alert-circle</v-icon>
                    <v-list-item-title class="topic-content topic-title">Reisewarnungen</v-list-item-title>
                </div>
            </v-list-item>
            <v-list-item link>
                <div class="topic-container">
                    <v-icon class="topic-content">mdi-briefcase-account</v-icon>
                    <v-list-item-title class="topic-content topic-title">Botschaften</v-list-item-title>
                </div>
            </v-list-item>
            <v-list-item link>
                <div class="topic-container">
                    <v-icon class="topic-content">mdi-account-search</v-icon>
                    <v-list-item-title class="topic-content topic-title">Interpol</v-list-item-title>
                </div>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar style="display: flex; justify-content: start;">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>Dashboard</v-app-bar-title>
        <SearchBar @update:search="handleSearch"/>
    </v-app-bar>

    <v-main class="main-container">
        <!-- Row for the buttons -->
        <v-row style="margin: 0vh 2vh;" class="mb-4">
            <v-col
                    cols="12"
                    class="d-flex justify-start justify-space-between"
            >
                <div class="button-container">
                    <SelectedButton
                            value="all"
                            :selected="selected"
                            @update:selected="updateSelected"
                    >
                        Alle Warnungen
                    </SelectedButton>
                    <SelectedButton
                            value="food"
                            :selected="selected"
                            @update:selected="updateSelected"
                    >
                        Lebensmittel
                    </SelectedButton>
                    <SelectedButton
                            value="product"
                            :selected="selected"
                            @update:selected="updateSelected"
                    >
                        Produkte
                    </SelectedButton>
                </div>
                <v-select
                        label="Select"
                        :items="['Baden-Württemberg',
                                'Bayern',
                                'Berlin',
                                'Brandenburg',
                                'Bremen',
                                'Hamburg',
                                'Hessen',
                                'Mecklenburg-Vorpommern',
                                'Niedersachsen',
                                'Nordrhein-Westfalen',
                                'Rheinland-Pfalz',
                                'Saarland',
                                'Sachsen',
                                'Sachsen-Anhalt',
                                'Schleswig-Holstein',
                                'Thüringen']"
                        style="max-width: 30vh;"
                ></v-select>
            </v-col>
        </v-row>
        <v-container
                class="py-8 px-6"
                fluid
        >
            <v-row>
                <v-col
                        v-for="card_info in cards_info"
                        :key="card_info"
                        cols="12"
                >
                    <v-card style="padding: 0px 10px;" @click="showDetails = !showDetails; getDetails">
                        <v-list lines="two" style="
                                text-overflow: ellipsis;
                                display: flex;
                                overflow: hidden;
                                justify-content: flex-start;
                                align-items: center;">
                            <v-icon v-if="card_info.type === 'food_warning'" style="justify-items: center;">
                                mdi-food-apple
                            </v-icon>
                            <v-list-subheader :title="card_info.title"></v-list-subheader>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<style>

.v-list-subheader__text {
    white-space: normal;
    font-weight: bold;
}

.v-application__wrap {
    background-color: var(--dark-mode-bg);
}

.main-container {
    margin: 10vh 0vh 0vh 0vh;
    padding: 3vh;
    border-radius: 10px;
    background-color: var(--dark-mode-lighter-bg);
}

.v-navigation-drawer__scrim {
    opacity: 0.0;
}

.topic-title {
    margin-left: 10px;
    user-select: none;
}

.topic-container {
    display: flex;
}

.topic-content {
    justify-content: space-between;
}

</style>

<script setup>
import {ref} from 'vue'
import SelectedButton from "@/components/SelectedButton.vue";
import SearchBar from "@/components/SearchBar.vue";
import SideView from "@/components/SideView.vue";

const drawer = ref(null);
const selected = ref('all');
const searchResults = ref([]);

const handleSearch = (query) => {
    console.log(searchResults.value);
};

const updateSelected = (newValue) => {
    selected.value = newValue;
};

const getDetails = (cardValue) => {

}

const cards_info = [{
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
    }]

</script>

<script>
export default {
    data: () => ({
        drawer: null,
        showDetails: false
    }),
}
</script>