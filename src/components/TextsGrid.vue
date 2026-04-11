<script setup lang="ts">
import {useCycleList} from '@vueuse/core'

const props = defineProps({
  containerClass: {
    required: true,
    type: String,
  },
  items: {
    required: true,
    type: Array,
  },
  width: {
    required: true,
    type: String,
  },
})

const {state: texts, next} = useCycleList(props.items)

setInterval(next, 4000)
</script>

<template>
  <template
    v-for="text, i in texts"
    :key="i"
  >
    <div
      v-if="i > 0"
      :class="containerClass"
    >
      <div
        class="
          border-white h-6 border-x
          md:h-7
          lg:h-9
        "
        :class="width"
      />
    </div>

    <div
      class="
        border-white border-b text-2xl leading-[.69]!
        sm:text-3xl
        xl:text-5xl
      "
    >
      <div :class="containerClass">
        <div
          class="border-white border-x"
          :class="width"
        >
          <Transition
            mode="out-in"
            name="fade-up"
          >
            <p
              :key="text"
              class="lg:pl-12"
              :style="{transitionDelay: `calc(${i} * 120ms)`}"
              v-html="text"
            />
          </Transition>
        </div>
      </div>
    </div>
  </template>
</template>
