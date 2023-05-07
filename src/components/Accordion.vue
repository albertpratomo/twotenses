<script setup lang="ts">
import {ref} from 'vue';
import IPlus from '@/components/icons/IPlus.vue';

const props = defineProps({
    items: {
        required: true,
        type: Array,
    },
});

const isOpen = ref(props.items.map(_ => false));
</script>

<template>
    <div
        v-for="item, i in items"
        :key="i"
        class="container-fluid border-b border-white"
    >
        <button
            class="flex w-full items-center justify-between border-l border-white py-4 text-4xl"
            @click="isOpen[i] = !isOpen[i]"
        >
            {{ item.title }}

            <IPlus v-if="item.image.title !== null" />

            <div
                v-else
                class="flex h-14 items-center text-white"
            >
                {{ item.content }}
            </div>
        </button>

        <div v-if="isOpen[i] && item.image.title !== null">
            {{ item.content }}
        </div>
    </div>
</template>
