<template>
    <v-btn
        variant="outlined"
        class="selected-button"
        :class="{'selected-background': isSelected}"
        @click="onClick"
    >
        <slot></slot>
    </v-btn>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue';

const props = defineProps({
    value: {
        type: String,
        required: true
    },
    selected: {
        type: String,
        default: ''
    }
});

const emits = defineEmits(['update:selected']);

const isSelected = computed(() => props.value === props.selected);

const onClick = () => {
    emits('update:selected', props.value);
};
</script>

<style scoped>
.selected-button {
    border-radius: 20px;
    font-family: "Roboto", sans-serif;
    font-size: 12px;
}
.selected-background {
    color: white;
    background-color: var(--dark-mode-text);
}
</style>
