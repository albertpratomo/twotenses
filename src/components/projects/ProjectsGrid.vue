<script setup lang="ts">
import ProjectCard from '@/components/projects/ProjectCard.vue';

defineProps({
    categories: {
        required: true,
        type: Array,
    },
    industries: {
        required: true,
        type: Array,
    },
    projects: {
        required: true,
        type: Array,
    },
});
</script>

<template>
    <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-4 md:gap-y-12 lg:grid-cols-3">
        <ProjectCard
            v-for="(project, i) in projects"
            :key="i"
            :project="project"
        />
    </div>

    <div v-if="projects.length === 0">
        No projects found for the active filter.
    </div>
</template>
