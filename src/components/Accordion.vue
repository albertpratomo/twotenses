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
                class="flex w-full items-center justify-between py-4 pr-3 text-4xl"
                @click="isOpen[i] = !isOpen[i]"
            >
                {{ item.title }}

                <IPlus
                    v-if="item.image.title !== null"
                    class="z-10 transition-transform duration-300 ease-in-out"
                    :class="{ '-rotate-45': isOpen[i] }"
                />

                <div
                    v-else
                    class="flex h-14 items-center text-white"
                >
                    {{ item.content }}
                </div>
            </button>

            <Transition name="fade">
                <div
                    v-if="isOpen[i] && item.image.title !== null"
                    class="mt-28 max-w-md pb-6"
                >
                    {{ item.content }}
                </div>
            </Transition>

            <Transition name="fade">
                <picture
                    v-if="isOpen[i] && item.image.title !== null"
                    class="pointer-events-none absolute inset-y-0 right-0"
                >
                    <source
                        media="(max-width: 639px)"
                        :srcset="`${item.image.url}639x852`"
                    >

                    <source
                        media="(max-width: 767px)"
                        :srcset="`${item.image.url}767x431`"
                    >

                    <source
                        media="(max-width: 1023px)"
                        :srcset="`${item.image.url}1023x1364`"
                    >

                    <img
                        :alt="item.image.alt"
                        class="h-full"
                        loading="lazy"
                        :src="`${item.image.url}672x388`"
                        :title="item.image.title"
                    >
                </picture>
            </Transition>
        </div>
    </div>
</template>
