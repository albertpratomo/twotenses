<script setup lang="ts">
import type {Swiper as ISwiper} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/vue'
import {ref} from 'vue'
import {below, getSrcset} from '@/utils'
import 'swiper/css'

defineProps({
  items: {
    required: true,
    type: Array,
  },
})

const swiper = ref<ISwiper>()
let intervalId: number

function onSwiper(instance: ISwiper) {
  swiper.value = instance
  intervalId = setInterval(() => {
    swiper.value.slideNext()
  }, 3000)
}

function stopAutoplay() {
  clearInterval(intervalId)
}
</script>

<template>
  <div>
    <div
      v-if="swiper"
      class="
        flex items-center justify-between p-4 text-sm uppercase-wide
        lg:px-0
      "
    >
      <span>{{ items[swiper.realIndex].description }}</span>

      <span class="flex items-center gap-3">
        <span>{{ `${swiper.realIndex + 1}`.padStart(2, '0') }}</span>

        <span class="w-10 border-t border-current" />

        <span>{{ `${items.length}`.padStart(2, '0') }}</span>
      </span>
    </div>

    <Swiper
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
              :media="below.sm"
              :srcset="getSrcset(item.image_portrait, 639, 852)"
              width="639"
            >

            <source
              height="431"
              :media="below.md"
              :srcset="getSrcset(item.image_landscape, 767, 431)"
              width="767"
            >

            <source
              height="682"
              :media="below.lg"
              :srcset="getSrcset(item.image_landscape, 1023, 682)"
              width="1023"
            >

            <img
              :alt="item.image_landscape.alt"
              class="skeleton object-cover"
              height="798"
              loading="lazy"
              :srcset="getSrcset(item.image_landscape, 1197, 798)"
              :title="item.image_landscape.title"
              width="1197"
              @load="e => e.target.classList.remove('skeleton')"
            >
          </picture>
        </a>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
