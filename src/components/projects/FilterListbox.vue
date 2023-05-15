<script setup lang="ts">
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/vue';
import {computed} from 'vue';
import IPlus from '@/components/icons/IPlus.vue';

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
    <Listbox
        v-slot="{ open }"
        v-model="modelValue"
        as="div"
        class="relative -ml-2 whitespace-nowrap"
    >
        <ListboxButton class="w-full px-2 py-1 text-left text-white">
            <div class="flex items-center gap-3 text-red">
                {{ label }}

                <IPlus
                    class="stroke-7 transition-transform"
                    :class="{ '-rotate-45': open }"
                    size="h-3"
                />
            </div>

            {{ model.name }}
        </ListboxButton>

        <Transition name="fade">
            <ListboxOptions class="absolute top-6 bg-black">
                <ListboxOption
                    v-for="o in options"
                    :key="o.value"
                    v-slot="{ selected }"
                    class="cursor-pointer px-2 py-1"
                    :value="o.value"
                >
                    <div
                        class="hover:text-white"
                        :class="selected ? 'text-white' : 'text-gray/50' "
                    >
                        {{ o.name }}
                    </div>
                </ListboxOption>
            </ListboxOptions>
        </Transition>
    </Listbox>
</template>
