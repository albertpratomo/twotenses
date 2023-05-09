<script setup lang="ts">
import {useCycleList} from '@vueuse/core';

const props = defineProps({
    items: {
        required: true,
        type: Array,
    },
});

const {state: texts, next} = useCycleList(props.items);

setInterval(next, 4000);
</script>

<template>
    <div class="container-fluid">
        <div class="h-[100svh] max-w-4xl flex-col justify-center gap-8 border-x border-white text-8xl leading-[.67]">
            <div
                v-for="text, i in texts"
                :key="i"
                class="border-y border-white"
            >
                <Transition
                    mode="out-in"
                    name="fade-up"
                >
                    <div
                        :key="text"
                        :style="{ transitionDelay: `calc(${i} * 120ms)` }"
                        v-html="text"
                    />
                </Transition>
            </div>
        </div>
    </div>
</template>
