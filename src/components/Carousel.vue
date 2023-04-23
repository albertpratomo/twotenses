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
    <div class="relative">
        <picture>
            <source
                media="(max-width: 639px)"
                :srcset="`${item.image_portrait.url}639x852`"
            >

            <source
                media="(max-width: 767px)"
                :srcset="`${item.image_landscape.url}767x431`"
            >

            <source
                media="(max-width: 1023px)"
                :srcset="`${item.image_portrait.url}1023x1364`"
            >

            <img
                :alt="item.image_landscape.alt"
                :src="`${item.image_landscape.url}1920x1080`"
                :title="item.image_landscape.title"
            >
        </picture>

        <div
            class="container-fluid absolute inset-x-0 bottom-8 flex justify-between text-2xl"
            :class="item.text_color"
        >
            <p>
                {{ item.description }}
            </p>

            <div class="flex divide-x-2">
                <span class="pr-4">01</span>

                <span class="pl-4">
                    0{{ items.length }}
                </span>
            </div>
        </div>
    </div>
</template>
