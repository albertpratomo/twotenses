<script setup lang="ts">
import {ref} from 'vue';
import IPlus from '@/components/icons/IPlus.vue';
import {getSrcset} from '@/utils';

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
        class="border-b border-white"
        :class="{ 'border-t': i === 0 }"
    >
        <div class="container-fluid px-container">
            <div class="relative border-l border-white">
                <button
                    class="flex w-full items-center justify-between py-4 text-2xl md:text-3xl lg:pr-3"
                    @click="isOpen[i] = !isOpen[i]"
                >
                    {{ item.title }}

                    <IPlus
                        v-if="item.image.title !== null"
                        class="transition-transform duration-300 ease-in-out"
                        :class="{ '-rotate-45': isOpen[i] }"
                        size="h-8 md:h-14"
                    />

                    <div
                        v-else
                        class="flex h-8 items-center md:h-14"
                    >
                        {{ item.content }}
                    </div>
                </button>

                <Transition name="fade">
                    <div
                        v-if="isOpen[i] && item.image.title !== null"
                        class="pointer-events-none flex flex-col justify-between lg:mt-[-5.5rem] lg:flex-row"
                    >
                        <picture class="sm:w-1/2">
                            <source
                                height="359"
                                media="(max-width: 639px)"
                                :srcset="getSrcset(item.image, 639, 359)"
                                width="639"
                            >

                            <source
                                height="431"
                                media="(max-width: 767px)"
                                :srcset="getSrcset(item.image, 767, 431)"
                                width="767"
                            >

                            <source
                                height="575"
                                media="(max-width: 1023px)"
                                :srcset="getSrcset(item.image, 1023, 575)"
                                width="1023"
                            >

                            <img
                                :alt="item.image.alt"
                                class="skeleton w-full"
                                height="388"
                                loading="lazy"
                                :srcset="getSrcset(item.image, 672, 388)"
                                :title="item.image.title"
                                width="672"
                                @load="e => e.target.classList.remove('skeleton')"
                            >
                        </picture>

                        <div class="py-4 text-lg md:py-6 md:text-xl lg:order-first lg:w-1/2 lg:pr-16 lg:pt-28">
                            {{ item.content }}
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>
