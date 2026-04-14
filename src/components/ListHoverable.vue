<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import {below, getSrcset} from '@/utils'

const props = defineProps({
  title: {
    required: true,
    type: String,
  },
  items: {
    required: true,
    type: Array,
  },
})

const activeIndex = ref(0)
let autoplayTimer: ReturnType<typeof setInterval> | null = null

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function onMouseenter(i: number) {
  stopAutoplay()
  activeIndex.value = i
}

onMounted(() => {
  autoplayTimer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % props.items.length
  }, 1500)
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <div
    class="
      grid gap-y-10
      lg:grid-cols-2 lg:gap-8
    "
  >
    <div>
      <h2 class="uppercase-wide">
        {{ title }}
      </h2>

      <ul
        class="
          mt-10 flex flex-col gap-4
          lg:mt-16 lg:gap-8 lg:pl-12
          xl:gap-12
        "
      >
        <li
          v-for="item, i in items"
          :key="i"
          @mouseenter="onMouseenter(i)"
        >
          <span
            class="
              text-2xl transition-colors duration-300
              lg:text-3xl
              xl:text-4xl
            "
            :class="activeIndex === i ? 'text-red' : 'text-gray'"
          >
            {{ item.title }}
          </span>
        </li>
      </ul>
    </div>

    <div class="flex">
      <div
        class="
          relative ml-auto aspect-3/4 w-3/4
          lg:w-full
          xl:mr-auto xl:w-3/4
        "
      >
        <picture
          v-for="item, i in items"
          :key="i"
          class="absolute inset-0 transition-opacity duration-500"
          :class="activeIndex === i ? 'opacity-100' : 'opacity-0'"
        >
          <source
            height="607"
            :media="below.sm"
            :srcset="getSrcset(item.image, 455, 607)"
            width="455"
          >

          <source
            height="735"
            :media="below.md"
            :srcset="getSrcset(item.image, 551, 735)"
            width="551"
          >

          <source
            height="959"
            :media="below.lg"
            :srcset="getSrcset(item.image, 719, 959)"
            width="719"
          >

          <img
            :alt="item.image.alt"
            class="size-full skeleton object-cover"
            height="879"
            loading="lazy"
            :srcset="getSrcset(item.image, 659, 879)"
            :title="item.image.title"
            width="659"
            @load="e => e.target.classList.remove('skeleton')"
          >
        </picture>
      </div>
    </div>
  </div>
</template>
