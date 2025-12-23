<script setup lang="ts">
import {useCycleList} from '@vueuse/core';

const props = defineProps({
    containerClass: {
        required: true,
        type: String,
    },
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
            :class="containerClass"
        >
            <div
                class="h-3 border-x border-white sm:h-4 md:h-7 lg:h-9"
                :class="width"
            />
        </div>

        <div class="border-b border-white text-3xl leading-[.69]! sm:text-4xl xl:text-5xl">
            <div :class="containerClass">
                <div
                    class="border-x border-white flex justify-center"
                    :class="width"
                >
                    <Transition
                        mode="out-in"
                        name="fade-up"
                    >
                        <p
                            class="w-[70%]"
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
