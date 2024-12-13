<script setup lang="ts">
import {useCycleList} from '@vueuse/core';

const props = defineProps({
    items: {
        required: true,
        type: Array,
    },
    width: {
        required: true,
        type: String,
    },
});

const {state: texts, next} = useCycleList(props.items);

setInterval(next, 4000);
</script>

<template>
    <template
        v-for="text, i in texts"
        :key="i"
    >
        <div
            v-if="i > 0"
            class="container-fluid px-container w-full"
        >
            <div
                class="h-3 border-x border-white sm:h-4 md:h-7 lg:h-9"
                :class="width"
            />
        </div>

        <div class="border-y border-white text-3xl !leading-[.67] sm:text-5xl md:text-6xl lg:text-[5rem]">
            <div class="container-fluid px-container">
                <div
                    class="border-x border-white "
                    :class="width"
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
</template>
