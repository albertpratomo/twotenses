<script setup lang="ts">
import {getSrcset} from '@/utils';
import IArrowBox from '@/components/icons/IArrowBox.vue';

defineProps({
    project: {
        required: true,
        type: Object,
    },
});
</script>

<template>
    <a
        :aria-label="`View ${project.name} project details`"
        :href="project.href"
    >
        <picture>
            <source
                media="(max-width: 414px)"
                :srcset="getSrcset(project.thumbnail, 414, 276)"
            >

            <img
                :alt="project.thumbnail.alt || `${project.name} project thumbnail`"
                class="skeleton"
                height="380"
                loading="lazy"
                :srcset="getSrcset(project.thumbnail, 570, 380)"
                :title="project.thumbnail.title"
                width="570"
                @load="e => e.target.classList.remove('skeleton')"
            >
        </picture>

        <h2 class="mt-4 uppercase-wide flex gap-3 items-center">
            {{ project.name }}

            <IArrowBox />
        </h2>
    </a>
</template>
