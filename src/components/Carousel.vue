<script setup lang="ts">
import {useCycleList} from '@vueuse/core';
import IArrow from '@/components/icons/IArrow.vue';

const props = defineProps({
    items: {
        required: true,
        type: Array,
    },
});

// TODO: animate slide left right
// TODO: interval next every 2s
// TODO: swipe left right
// TODO: responsiveness check
const {state: item, next, prev, index} = useCycleList(props.items);
</script>

<template>
    <div
        class="relative"
        :class="item.text_color"
    >
        <Transition
            mode="out-in"
            name="fade"
        >
            <div :key="index">
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

                <div class="container-fluid absolute inset-x-0 bottom-8 flex items-center justify-between md:text-2xl">
                    <p>
                        {{ item.description }}
                    </p>

                    <div class="flex divide-x-2">
                        <span class="pr-4">
                            {{ `${index + 1}`.padStart(2, '0') }}
                        </span>

                        <span class="pl-4">
                            {{ `${items.length}`.padStart(2, '0') }}
                        </span>
                    </div>
                </div>
            </div>
        </Transition>

        <div class="inset-y-center container-fluid inset-x-0 flex justify-between">
            <IArrow
                class="cursor-pointer"
                direction="left"
                @click="prev()"
            />

            <IArrow
                class="cursor-pointer"
                @click="next()"
            />
        </div>
    </div>
</template>
