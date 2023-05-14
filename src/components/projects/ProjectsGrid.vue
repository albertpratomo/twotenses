<script setup lang="ts">
import {ref} from 'vue';
import ProjectCard from '@/components/projects/ProjectCard.vue';
import ProjectsFilter from '@/components/projects/ProjectsFilter.vue';

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

const category = ref('all');
const industry = ref('all');
</script>

<template>
    <ProjectsFilter
        v-model:category="category"
        v-model:industry="industry"
        :categories="categories"
        :industries="industries"
    />

    <div class="mt-8 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-4 md:gap-y-12 lg:grid-cols-3">
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
