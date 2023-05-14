<script setup lang="ts">
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/vue';
import {computed} from 'vue';

const props = defineProps({
    label: {
        required: true,
        type: String,
    },
    options: {
        required: true,
        type: Array,
    },
});

const modelValue = defineModel<String>();

const model = computed(() => props.options.find(o => o.value === modelValue.value));
</script>

<template>
    <div>
        <label class="block text-red">
            {{ label }}
        </label>

        <Listbox v-model="modelValue">
            <ListboxButton>
                {{ model.name }}
            </ListboxButton>

            <ListboxOptions>
                <ListboxOption
                    v-for="o in options"
                    :key="o.value"
                    :value="o.value"
                >
                    {{ o.name }}
                </ListboxOption>
            </ListboxOptions>
        </Listbox>
    </div>
</template>
