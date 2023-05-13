<script setup lang="ts">
defineProps({
    projects: {
        required: true,
        type: Array,
    },
});
</script>

<template>
    <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-4 md:gap-y-12 lg:grid-cols-3">
        <div
            v-for="(project, i) in projects"
            :key="i"
            class="uppercase text-gray"
        >
            <picture>
                <source
                    media="(max-width: 414px)"
                    :srcset="`${project.thumbnail.url}414x276`"
                >

                <img
                    :alt="project.thumbnail.alt"
                    height="320"
                    loading="lazy"
                    :src="`${project.thumbnail.url}570x380`"
                    :title="project.thumbnail.title"
                    width="570"
                >
            </picture>

            <div class="mt-2">
                {{ project.name }}
            </div>
        </div>
    </div>

    <div v-if="projects.length === 0">
        No projects found for the active filter.
    </div>
</template>
