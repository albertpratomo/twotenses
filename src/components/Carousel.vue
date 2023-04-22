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
        <div class="flex justify-between">
            <p v-html="item.description" />

            <div class="text-white">
                01 | 0{{ items.length }}
            </div>
        </div>
    </div>
</template>
