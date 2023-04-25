<script setup lang="ts">
import type {Swiper as ISwiper} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue';
import {ref} from 'vue';
import IArrow from '@/components/icons/IArrow.vue';
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
        @swiper="onSwiper"
        @touch-start="stopAutoplay"
    >
        <SwiperSlide
            v-for="item, i in items"
            :key="i"
        >
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
        </SwiperSlide>

        <div
            v-if="swiper"
            class="container-fluid absolute inset-x-0 bottom-8 z-10 flex items-center justify-between md:text-2xl"
            :class="items[swiper.realIndex].text_color"
        >
            <p>
                {{ items[swiper.realIndex].description }}
            </p>

            <div class="flex divide-x-2">
                <span class="pr-4">
                    {{ `${swiper.realIndex + 1}`.padStart(2, '0') }}
                </span>

                <span class="pl-4">
                    {{ `${items.length}`.padStart(2, '0') }}
                </span>
            </div>
        </div>

        <div
            v-if="swiper"
            class="inset-y-center container-fluid inset-x-0 z-10 flex justify-between"
            :class="items[swiper.realIndex].text_color"
        >
            <IArrow
                class="cursor-pointer"
                direction="left"
                @click="swiper.slidePrev()"
            />

            <IArrow
                class="cursor-pointer"
                @click="swiper.slideNext()"
            />
        </div>
    </Swiper>
</template>
