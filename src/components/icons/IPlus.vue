<script setup lang="ts">
defineProps({
    size: {
        default: 'h-14',
        type: String,
    },
});
</script>

<template>
    <svg
        :class="size"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 54 54"
    >
        <path d="M0 26.734h53.468" />

        <path d="M26.734 53.468V0" />
    </svg>
</template>
