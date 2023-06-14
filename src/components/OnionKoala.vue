<script setup lang="ts">
import {useCycleList} from '@vueuse/core';
import {ref} from 'vue';

const slides = [
    {
        button: 'Yes... muah!',
        image: 'onion-koala.png',
        title: `
            Helloooo...? Helloooo...?<br>
            Am I talking to my bb? 
        `,
    },
    {
        answer: ['12-01-23'],
        button: 'I am your bb!',
        question: `
            Are you truly my bb?<br>
            Let\'s prove that by answering some questions.<br>
            When did we get together? (DD-MM-YY)
        `,
    },
    {
        answer: ['nasi padang', 'bumbu rendang', 'perkedel', 'nangka', 'telur dadar'],
        question: 'What is my favourite food?',
    },
];

const {state, next} = useCycleList(slides);

const answer = ref('');
const error = ref('');

function generateError(correct: number, total: number) {
    const percent = Math.floor(correct * 100 / total);

    const messages = [
        'Almost, try again!',
        'Coba tanya Albert lagi.',
        'Don\'t give up bb!',
    ];

    return `${messages[Math.floor(Math.random() * messages.length)]} (${percent}%)`;
}

function submit() {
    if (state.value.question) {
        let correct = 0;
        const correctAnswer = state.value.answer;
        const input = answer.value.toLowerCase();

        correctAnswer.forEach((a) => {
            if (input.includes(a))
                correct++;
        });

        if (correct >= correctAnswer.length) {
            answer.value = '';
            error.value = '';
            next();
        }
        else {
            error.value = generateError(correct, correctAnswer.length);
        }
    }
    else {
        next();
    }
}
</script>

<template>
    <section class="flex-center h-screen flex-col text-center text-gray">
        <img
            v-if="state.image"
            class="mb-8 rounded"
            :src="`/images/onion-koala/${state.image}`"
        >

        <h1
            v-if="state.title"
            v-html="state.title"
        />

        <h2
            v-if="state.question"
            v-html="state.question"
        />

        <textarea
            v-if="state.question"
            v-model="answer"
            class="mt-8 w-80 rounded border bg-transparent p-3 focus:outline-none"
            rows="3"
        />

        <div
            v-if="error"
            class="mt-2 text-red"
            v-html="error"
        />

        <button
            class="mt-8 rounded border px-4 py-2 hover:bg-gray hover:text-black"
            @click="submit()"
        >
            {{ state.button || 'OK' }}
        </button>
    </section>
</template>
