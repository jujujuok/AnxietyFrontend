<template>
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

    <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-app-bar-title>Dashboard</v-app-bar-title>
    </v-app-bar>

    <v-main class="main-container">
        <!-- Row for the buttons -->
        <v-row class="mb-4">
            <v-col
                    cols="12"
                    class="d-flex justify-start"
            >
                <SelectedButton
                    v-for="button_text in buttons_texts"
                    :key="button_text.value"
                    :value="button_text.value"
                    :selected="selected"
                    @update:selected="selected = $event"
                >
                    {{ button_text.text }}
                </SelectedButton>
            </v-col>
        </v-row>
        <v-container
                class="py-8 px-6"
                fluid
        >
            <v-row>
                <v-col
                        v-for="card in cards"
                        :key="card"
                        cols="12"
                >
                    <v-card>
                        <v-list lines="two">
                            <v-list-subheader :title="card"></v-list-subheader>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<style>

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

const drawer = ref(null);
const selected = ref('nearby');

const cards = ['Monster Energy hat einen alarmierenden Koffeingehalt', 'Der EQS AMG 450 hat 2mm zu große Spaltmaße'];

const buttons_texts = [
    { text: 'In der Nähe', value: 'nearby' },
    { text: 'Deutschland', value: 'germany' },
    { text: 'Bundesland', value: 'state' }
];
</script>

<script>
export default {
    data: () => ({
        drawer: null,
        cards: ['Monster Energy hat einen alarmierenden Koffeingehalt', 'Der EQS AMG 450 hat 2mm zu große Spaltmaße']
    }),
}
</script>