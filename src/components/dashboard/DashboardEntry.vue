<template>
    <div class="entry" :style="{ backgroundColor: entry.color }">
        <div class="icon-wrapper">
            <!-- <component :is="entry.icon" />-->
        </div>
        <div class="data-wrapper">
            <h2>{{ entry.title }}</h2>
            <div v-for="(value, country) in entry.data" :key="country">
                {{ country }}: {{ value }}
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    entry: Object,
});
</script>

<style scoped>
/* Add any specific styling for the DashboardEntry component here */
</style>