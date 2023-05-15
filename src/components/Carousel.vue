<script setup lang="ts">
import type {Swiper as ISwiper} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue';
import {ref} from 'vue';
import 'swiper/css';

defineProps({
    items: {
        required: true,
        type: Array,
    },
});

const swiper = ref<ISwiper>();

let intervalId: number;

function onSwiper(instance: ISwiper) {
    swiper.value = instance;

    intervalId = setInterval(() => { swiper.value.slideNext(); }, 3000);
}

function stopAutoplay() {
    clearInterval(intervalId);
}
</script>

<template>
    <Swiper
        class="relative"
        loop
        @click="stopAutoplay"
        @slider-move="stopAutoplay"
        @swiper="onSwiper"
    >
        <SwiperSlide
            v-for="item, i in items"
            :key="i"
        >
            <a
                v-bind="item.link"
                :aria-label="item.description"
            >
                <picture>
                    <source
                        height="852"
                        media="(max-width: 639px)"
                        :srcset="`${item.image_portrait.url}639x852`"
                        width="639"
                    >

                    <source
                        height="431"
                        media="(max-width: 767px)"
                        :srcset="`${item.image_landscape.url}767x431`"
                        width="767"
                    >

                    <source
                        height="1364"
                        media="(max-width: 1023px)"
                        :srcset="`${item.image_portrait.url}1023x1364`"
                        width="1023"
                    >

                    <img
                        :alt="item.image_landscape.alt"
                        class="max-h-screen w-full object-cover"
                        height="1080"
                        loading="lazy"
                        :src="`${item.image_landscape.url}1920x1080`"
                        :title="item.image_landscape.title"
                        width="1920"
                    >
                </picture>
            </a>
        </SwiperSlide>

        <div
            v-if="swiper"
            class="container-fluid pointer-events-none absolute inset-0 z-10 flex-col justify-between gap-4 py-4 md:flex-row md:items-end md:py-8 md:text-2xl"
            :class="items[swiper.realIndex].text_color"
        >
            <div class="flex divide-x-2">
                <span class="pr-4">
                    {{ `${swiper.realIndex + 1}`.padStart(2, '0') }}
                </span>

                <span class="pl-4">
                    {{ `${items.length}`.padStart(2, '0') }}
                </span>
            </div>

            <p class="md:order-first">
                {{ items[swiper.realIndex].description }}
            </p>
        </div>

        <div
            v-if="swiper"
            class="absolute inset-y-0 left-0 z-10 hidden w-1/4 cursor-arrow-left lg:flex"
            @click="swiper.slidePrev(); stopAutoplay();"
        />

        <div
            v-if="swiper"
            class="absolute inset-y-0 right-0 z-10 hidden w-1/4 cursor-arrow-right lg:flex"
            @click="swiper.slideNext(); stopAutoplay();"
        />
    </Swiper>
</template>
