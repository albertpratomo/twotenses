<script setup lang="ts">
defineProps({
    isOpen: {
        default: false,
        type: Boolean,
    },
});

defineEmits(['toggle']);
</script>

<template>
    <button
        aria-label="Menu"
        class="flex h-6 w-6 flex-col justify-between transition-transform"
        :class="isOpen ? '-rotate-45' : ''"
        @click="$emit('toggle')"
    >
        <div
            class="h-1 w-1/2 origin-right bg-gray transition-transform delay-150"
            :class="isOpen ? '-rotate-90 -translate-y-0.5' : ''"
        />

        <div class="h-1 w-full bg-gray" />

        <div
            class="h-1 w-1/2 origin-left self-end bg-gray transition-transform delay-150"
            :class="isOpen ? '-rotate-90 translate-y-0.5' : ''"
        />
    </button>
</template>
