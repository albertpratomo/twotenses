<script setup lang="ts">
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue';

defineProps({
    items: {
        required: true,
        type: Array,
    },
});
</script>

<template>
    <Disclosure
        v-for="item, i in items"
        :key="i"
        as="div"
    >
        <DisclosureButton class="py-2">
            {{ item.title }}
        </DisclosureButton>

        <DisclosurePanel>
            {{ item.content }}
        </DisclosurePanel>
    </Disclosure>
</template>
