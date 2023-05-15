<script setup lang="ts">
defineProps({
    project: {
        required: true,
        type: Object,
    },
});
</script>

<template>
    <a
        class="uppercase text-gray"
        :href="project.href"
    >
        <picture>
            <source
                media="(max-width: 414px)"
                :srcset="`${project.thumbnail.url}414x276`"
            >

            <img
                :alt="project.thumbnail.alt"
                height="380"
                loading="lazy"
                :src="`${project.thumbnail.url}570x380`"
                :title="project.thumbnail.title"
                width="570"
            >
        </picture>

        <div class="mt-2">
            {{ project.name }}
        </div>
    </a>
</template>
