<script setup lang="ts">
import {ref} from 'vue';
import IPlus from '@/components/icons/IPlus.vue';

const props = defineProps({
    items: {
        required: true,
        type: Array,
    },
});

const isOpen = ref(props.items.map(_ => false));
</script>

<template>
    <div
        v-for="item, i in items"
        :key="i"
        class="container-fluid border-b border-white"
    >
        <div class="relative border-l border-white">
            <button
                class="flex w-full items-center justify-between py-4 text-2xl md:pr-3 md:text-4xl"
                @click="isOpen[i] = !isOpen[i]"
            >
                {{ item.title }}

                <IPlus
                    v-if="item.image.title !== null"
                    class="z-10 transition-transform duration-300 ease-in-out"
                    :class="{ '-rotate-45': isOpen[i] }"
                    size="h-8 md:h-14"
                />

                <div
                    v-else
                    class="flex h-8 items-center text-white md:h-14"
                >
                    {{ item.content }}
                </div>
            </button>

            <Transition name="fade">
                <picture
                    v-if="isOpen[i] && item.image.title !== null"
                    class="pointer-events-none inset-y-0 right-0 lg:absolute"
                >
                    <source
                        media="(max-width: 639px)"
                        :srcset="`${item.image.url}639x359`"
                    >

                    <source
                        media="(max-width: 767px)"
                        :srcset="`${item.image.url}767x431`"
                    >

                    <source
                        media="(max-width: 1023px)"
                        :srcset="`${item.image.url}1023x575`"
                    >

                    <img
                        :alt="item.image.alt"
                        class="lg:h-full"
                        loading="lazy"
                        :src="`${item.image.url}672x388`"
                        :title="item.image.title"
                    >
                </picture>
            </Transition>

            <Transition name="fade">
                <div
                    v-if="isOpen[i] && item.image.title !== null"
                    class="mt-4 max-w-md pb-6 lg:mt-28"
                >
                    {{ item.content }}
                </div>
            </Transition>
        </div>
    </div>
</template>
