<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps({
  isOpen: {
    default: false,
    type: Boolean,
  },
})

defineEmits(['toggle'])

const color = computed(() => {
  return props.isOpen ? 'bg-gray-light' : 'bg-gray group-[.bg-gray-light]:bg-red'
})
</script>

<template>
  <button
    aria-label="Menu"
    class="flex flex-col h-5 w-7 justify-between transition-transform"
    :class="isOpen ? '-rotate-45' : ''"
    @click="$emit('toggle')"
  >
    <div
      class="h-0.5 w-1/2 origin-right transition-transform delay-150"
      :class="[isOpen ? '-translate-y-1.25 -rotate-90' : '', color]"
    />

    <div
      class="h-0.5 w-full"
      :class="color"
    />

    <div
      class="h-0.5 w-1/2 origin-left self-end transition-transform delay-150"
      :class="[isOpen ? 'translate-y-1.25 -rotate-90' : '', color]"
    />
  </button>
</template>
