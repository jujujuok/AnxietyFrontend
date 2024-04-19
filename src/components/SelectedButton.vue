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
    border-radius: 1vh;
    margin: 0vh 2vh 0vh 0vh;
    font-size: 0.7rem;
}
.selected-background {
    color: white;
    background-color: var(--dark-mode-text);
}
</style>
