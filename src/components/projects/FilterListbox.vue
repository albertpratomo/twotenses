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

        <Listbox
            v-model="modelValue"
            as="div"
            class="relative -ml-2 whitespace-nowrap"
        >
            <ListboxButton class="w-full px-2 py-1 text-left text-white">
                {{ model.name }}
            </ListboxButton>

            <Transition name="fade">
                <ListboxOptions class="absolute top-0 bg-black">
                    <ListboxOption
                        v-for="o in options"
                        :key="o.value"
                        v-slot="{ selected }"
                        class="cursor-pointer px-2 py-1"
                        :value="o.value"
                    >
                        <span :class="selected ? 'text-white' : 'text-gray/50' ">
                            {{ o.name }}
                        </span>
                    </ListboxOption>
                </ListboxOptions>
            </Transition>
        </Listbox>
    </div>
</template>
