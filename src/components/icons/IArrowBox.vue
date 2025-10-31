<script setup lang="ts">
defineProps({
    size: {
        default: 'size-4',
        type: String,
    },
});
</script>

<template>
    <svg 
        :class="size"
        viewBox="0 0 16 16"
        fill="none"
    >
        <rect x="0.5" y="0.5" width="15" height="15" stroke="currentColor"/>
        <path d="M12.3536 8.35355C12.5488 8.15829 12.5488 7.84171 12.3536 7.64645L9.17157 4.46447C8.97631 4.2692 8.65973 4.2692 8.46447 4.46447C8.2692 4.65973 8.2692 4.97631 8.46447 5.17157L11.2929 8L8.46447 10.8284C8.2692 11.0237 8.2692 11.3403 8.46447 11.5355C8.65973 11.7308 8.97631 11.7308 9.17157 11.5355L12.3536 8.35355ZM4 8V8.5H12V8V7.5H4V8Z" fill="currentColor"/>
    </svg>
</template>
