<template>
    <v-card flat style="width: 50%; padding: 2vh;">
        <v-text-field
                v-model="searchQuery"
                append-icon="mdi-magnify"
                label="Search"
                hide-details
                variant="outlined"
                @input="handleInput"
        ></v-text-field>
    </v-card>
</template>

<style>
.v-input--density-default .v-field--variant-outlined, .v-input--density-default .v-field--single-line, .v-input--density-default .v-field--no-label {
    height: 80%;
}

.v-input__control {
    display: flex;
    align-items: center;
}

.v-field--center-affix .v-label.v-field-label {
    top: 40%;
}

</style>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');

const handleInput = () => {
    console.log(searchQuery.value);
};
</script>