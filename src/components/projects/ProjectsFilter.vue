<script setup lang="ts">
import FilterListbox from '@/components/projects/FilterListbox.vue';

defineProps({
    categories: {
        required: true,
        type: Array,
    },
    industries: {
        required: true,
        type: Array,
    },
});

const category = defineModel<String>('category');
const industry = defineModel<String>('industry');
</script>

<template>
    <div class="flex">
        <FilterListbox
            v-model="category"
            class="w-40"
            label="CATEGORY"
            :options="categories"
        />

        <FilterListbox
            v-model="industry"
            label="CLIENT TYPE"
            :options="industries"
        />
    </div>
</template>
