<script setup lang="ts">
import {ref} from 'vue';
import {onClickOutside} from '@vueuse/core';
import IHamburger from '@/components/icons/IHamburger.vue';

const isOpen = ref(false);

const menu = ref(null);

onClickOutside(menu, () => isOpen.value = false);
</script>

<template>
    <div ref="menu">
        <IHamburger
            class="relative z-10"
            :is-open="isOpen"
            @toggle="isOpen = !isOpen"
        />

        <Transition name="slide-left">
            <div
                v-if="isOpen"
                class="fixed inset-y-0 right-0 bg-black p-4 pt-20"
            >
                <slot />
            </div>
        </Transition>
    </div>
</template>
