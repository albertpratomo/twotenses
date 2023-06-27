<script setup lang="ts">
defineProps({
    direction: {
        default: 'right',
        type: String,
    },
});
</script>

<template>
    <svg
        class="h-14"
        :class="direction === 'left' ? 'rotate-180' : ''"
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
