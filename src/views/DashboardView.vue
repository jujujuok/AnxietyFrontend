<template>
    <v-navigation-drawer v-model="drawer">
        <v-list dense>
            <v-list-item title="Dashboard"></v-list-item>
            <v-divider></v-divider>
            <RouterLink :to="{name: 'dashboard', params: {type: 'food-product-warnings'}}">
                <v-list-item @click="drawer = false; router.push('/dashboard/food-product-warnings');">
                    <div class="topic-container">
                        <v-icon class="topic-content">mdi-food-apple</v-icon>
                        <v-list-item-title class="topic-content topic-title">Produkt- und Lebensmittelwarnungen
                        </v-list-item-title>
                    </div>
                </v-list-item>
            </RouterLink>
            <RouterLink :to="{name: 'dashboard', params: {type: 'travel-warnings'}}">
                <v-list-item @click="drawer = false; router.push('/dashboard/travel-warnings');">
                    <div class="topic-container">
                        <v-icon class="topic-content">mdi-alert-circle</v-icon>
                        <v-list-item-title class="topic-content topic-title">Reisewarnungen</v-list-item-title>
                    </div>
                </v-list-item>
            </RouterLink>
            <RouterLink :to="{name: 'dashboard', params: {type: 'embassies'}}">
                <v-list-item @click="drawer = false; router.push('/dashboard/embassies');">
                    <div class="topic-container">
                        <v-icon class="topic-content">mdi-briefcase-account</v-icon>
                        <v-list-item-title class="topic-content topic-title">Botschaften</v-list-item-title>
                    </div>
                </v-list-item>
            </RouterLink>
            <RouterLink :to="{name: 'dashboard', params: {type: 'interpol'}}">
                <v-list-item @click="drawer = false; router.push('/dashboard/interpol');">
                    <div class="topic-container">
                        <v-icon class="topic-content">mdi-account-search</v-icon>
                        <v-list-item-title class="topic-content topic-title">Interpol</v-list-item-title>
                    </div>
                </v-list-item>
            </RouterLink>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar style="display: flex; justify-content: start;">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>Dashboard</v-app-bar-title>
        <SearchBar/>
    </v-app-bar>

    <DashboardContent :type="type"></DashboardContent>
</template>

<style>

.router-link {
    color: var(--dark-mode-text);
}

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
import SearchBar from "@/components/SearchBar.vue";
import {RouterLink, useRouter} from "vue-router";
import {VIcon} from "vuetify/components";
import DashboardContent from "@/components/DashboardContent.vue";
import "@/views/DashboardView.vue";

const drawer = ref(false);
const router = useRouter();
const searchResults = ref([]);

const props = defineProps({
    type: String,
    required: true
})

</script>

<script>
export default {
    data: () => ({
        drawer: null,
        showDetails: false
    }),
}
</script>