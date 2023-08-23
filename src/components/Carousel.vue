<script setup lang="ts">
import type {Swiper as ISwiper} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue';
import {onMounted, ref} from 'vue';
import 'swiper/css';
import {getSrcset} from '@/utils';

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

const oPressed = ref(false);

onMounted(() => {
    window.addEventListener('keydown', (event) => {
        if (event.ctrlKey) {
            if (event.code === 'KeyO') {
                oPressed.value = true;
                return;
            }

            if (event.code === 'KeyK' && oPressed.value)
                window.location.href = '/onion-koala';
        }

        if (oPressed.value)
            oPressed.value = false;
    });
});
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
                        :srcset="getSrcset(item.image_portrait, 639, 852)"
                        width="639"
                    >

                    <source
                        height="431"
                        media="(max-width: 767px)"
                        :srcset="getSrcset(item.image_landscape, 767, 431)"
                        width="767"
                    >

                    <source
                        height="1364"
                        media="(max-width: 1023px)"
                        :srcset="getSrcset(item.image_portrait, 1023, 1364)"
                        width="1023"
                    >

                    <img
                        :alt="item.image_landscape.alt"
                        class="skeleton max-h-screen w-full object-cover"
                        height="1080"
                        loading="lazy"
                        :srcset="getSrcset(item.image_landscape, 1920, 1080)"
                        :title="item.image_landscape.title"
                        width="1920"
                        @load="e => e.target.classList.remove('skeleton')"
                    >
                </picture>
            </a>
        </SwiperSlide>

        <div
            v-if="swiper"
            class="container-fluid px-container pointer-events-none absolute inset-0 z-10 flex-col justify-between gap-4 py-4 md:flex-row md:items-end md:py-8 md:text-2xl"
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
