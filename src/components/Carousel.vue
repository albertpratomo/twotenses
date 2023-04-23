<script setup lang="ts">
const props = defineProps({
    items: {
        required: true,
        type: Array,
    },
});

const item = props.items[0];
</script>

<template>
    <div>
        <img
            class="w-full"
            :src="item.image"
        >

        <div
            class="flex justify-between"
            :class="item.text_color"
        >
            <p>{{ item.description }}</p>

            <div class="text-white">
                01 | 0{{ items.length }}
            </div>
        </div>
    </div>
</template>
