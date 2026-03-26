<script setup lang="ts">
import {ref} from 'vue'
import IHamburger from '@/components/icons/IHamburger.vue'

const isOpen = ref(false)
</script>

<template>
  <div>
    <IHamburger
      class="relative z-10"
      :is-open="isOpen"
      @toggle="isOpen = !isOpen"
    />

    <Transition name="slide-left">
      <div
        v-if="isOpen"
        class="fixed inset-0"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>
