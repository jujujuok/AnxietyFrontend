<template>
        <v-navigation-drawer v-model="drawer">
            <v-list dense>
                <v-list-item title="Dashboard"></v-list-item>
                <v-divider></v-divider>
                <v-list-item link>
                    <div class="topic-container">
                        <v-icon class="topic-content">mdi-food-apple</v-icon>
                        <v-list-item-title class="topic-content topic-title">Produkt- und Lebensmittelwarnungen</v-list-item-title>
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
</template>

<style>

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

const drawer = ref(null)
</script>

<script>
export default {
    data: () => ({drawer: null}),
}
</script>