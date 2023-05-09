<script setup lang="ts">
const props = defineProps({
    items: {
        required: true,
        type: Array,
    },
});

const texts = props.items[0];
</script>

<template>
    <div class="min-h-screen max-w-4xl flex-col justify-center gap-8 border-x border-white text-8xl leading-[.67]">
        <div
            v-for="text, i in texts"
            :key="i"
            class="border-y border-white"
            v-html="text"
        />
    </div>
</template>
