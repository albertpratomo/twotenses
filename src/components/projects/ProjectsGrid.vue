<script setup lang="ts">
import {computed, ref} from 'vue';
import {useAutoAnimate} from '@formkit/auto-animate/vue';
import ProjectCard from '@/components/projects/ProjectCard.vue';
import ProjectsFilter from '@/components/projects/ProjectsFilter.vue';

const props = defineProps({
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

const projects = computed(() => {
    return props.projects.filter((p) => {
        if (category.value !== 'all') {
            if (!p.categories.includes(category.value))
                return false;
        }

        if (industry.value !== 'all') {
            if (!p.industries.includes(industry.value))
                return false;
        }

        return true;
    });
});

const [grid] = useAutoAnimate();
</script>

<template>
    <ProjectsFilter
        v-model:category="category"
        v-model:industry="industry"
        :categories="categories"
        :industries="industries"
    />

    <div
        ref="grid"
        class="mt-8 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-4 md:gap-y-12 lg:grid-cols-3"
    >
        <ProjectCard
            v-for="project in projects"
            :key="project.name"
            :project="project"
        />
    </div>

    <div
        v-if="projects.length === 0"
        class="text-white"
    >
        No projects found for the selected filters.
    </div>
</template>
