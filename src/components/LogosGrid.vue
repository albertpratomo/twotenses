<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import {computed} from 'vue';
import 'swiper/css';
import 'swiper/css/effect-fade';
import {Autoplay, EffectFade} from 'swiper';

const props = defineProps({
    items: {
        required: true,
        type: Array,
    },
});

function chunkArray(array: unknown[], chunkSize: number) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        chunkedArray.push(chunk);
    }
    return chunkedArray;
}

const slides = chunkArray(props.items, 9);

const autoplay = computed(() => {
    return slides.length > 1
        ? {delay: 2500, disableOnInteraction: false}
        : false;
});
</script>

<template>
    <Swiper
        :autoplay="autoplay"
        effect="fade"
        :fade-effect="{ crossFade: true }"
        loop
        :modules="[Autoplay, EffectFade]"
        :speed="1000"
    >
        <SwiperSlide
            v-for="logos, i in slides"
            :key="i"
        >
            <div class="grid grid-cols-2 items-center gap-x-20 gap-y-16 sm:grid-cols-4 md:grid-cols-3 md:gap-x-32 md:gap-y-20">
                <a
                    v-for="logo, j in logos"
                    :key="j"
                    :href="logo.link.cached_url"
                    target="_blank"
                >
                    <img
                        :alt="logo.image.alt"
                        class="skeleton"
                        height="95"
                        loading="lazy"
                        :src="`${logo.image.filename}/m/466x0`"
                        :title="logo.image.title"
                        width="233"
                    >
                </a>
            </div>
        </SwiperSlide>
    </Swiper>
</template>
