<script setup lang="ts">
import {ref} from 'vue';
import IHamburger from '@/components/icons/IHamburger.vue';

defineProps({
    links: {
        required: true,
        type: Array,
    },
});

const isOpen = ref(false);
</script>

<template>
    <div>
        <IHamburger
            :is-open="isOpen"
            @toggle="isOpen = !isOpen"
        />
    </div>
</template>
