<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    direction: {
        default: 'right',
        type: String,
    },
    size: {
        default: 'h-14',
        type: String,
    },
});

const directionClass = computed(() => {
    switch (props.direction) {
        case 'left':
            return 'rotate-180';
        case 'bottom':
            return 'rotate-90';
        case 'top':
            return '-rotate-90';
        default:
            return '';
    }
});
</script>

<template>
    <svg
        :class="[directionClass, size]"
        fill="none"
        viewBox="0 0 56 51"
    >
        <path
            d="M.173 25.572l53.468.026M29.642 1.599l24.049 23.949L29.619 49.72"
            stroke="currentColor"
            stroke-width="2"
        />
    </svg>
</template>
