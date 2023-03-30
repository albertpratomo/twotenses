<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps({
    from: {
        default: 0,
        type: [Number, String],
    },
});

const count = ref(parseInt(props.from));
</script>

<template>
    <div class="flex gap-4 text-6xl text-white">
        <button @click="count--">
            -
        </button>

        <div>
            {{ count }}
        </div>

        <button @click="count++">
            +
        </button>
    </div>
</template>
