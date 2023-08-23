<script setup lang="ts">
import {getSrcset} from '@/utils';

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
                :srcset="getSrcset(project.thumbnail, 414, 276)"
            >

            <img
                :alt="project.thumbnail.alt"
                class="skeleton"
                height="380"
                loading="lazy"
                :srcset="getSrcset(project.thumbnail, 570, 380)"
                :title="project.thumbnail.title"
                width="570"
                @load="e => e.target.classList.remove('skeleton')"
            >
        </picture>

        <div class="mt-2">
            {{ project.name }}
        </div>
    </a>
</template>
