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
    <div class="h-[100svh] flex-col">
        <div class="container-fluid w-full grow">
            <div class="h-full max-w-4xl border-x border-white" />
        </div>

        <template
            v-for="text, i in texts"
            :key="i"
        >
            <div
                v-if="i > 0"
                class="container-fluid w-full"
            >
                <div class="h-9 max-w-4xl border-x border-white" />
            </div>

            <div class="border-y border-white text-8xl leading-[.67]">
                <div class="container-fluid">
                    <div class="max-w-4xl border-x border-white">
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

        <div class="container-fluid w-full grow">
            <div class="h-full max-w-4xl border-x border-white" />
        </div>
    </div>
</template>
