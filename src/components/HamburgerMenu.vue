<script setup lang="ts">
import {ref} from 'vue';
import IHamburger from '@/components/icons/IHamburger.vue';

const isOpen = ref(false);
</script>

<template>
    <div>
        <Transition name="slide-left">
            <div
                v-if="isOpen"
                class="fixed inset-0 bg-black/75"
                @click="isOpen = false"
            />
        </Transition>

        <IHamburger
            class="relative z-10"
            :is-open="isOpen"
            @toggle="isOpen = !isOpen"
        />

        <Transition name="slide-left">
            <div
                v-if="isOpen"
                class="fixed inset-y-0 right-0 bg-black p-4 pt-20 shadow"
            >
                <slot />
            </div>
        </Transition>
    </div>
</template>
