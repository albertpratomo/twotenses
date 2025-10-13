<script setup lang="ts">
import {useCycleList} from '@vueuse/core';
import {ref} from 'vue';

const slides = [
    {
        buttons: ['Your lovely bb 🥰', 'Your cranky bb 🥺'],
        image: 'onion-koala.png',
        title: `
            Helloooo...? Helloooo...?<br>
            Who's there? 👀
        `,
    },
    {
        answer: ['08-01-23'],
        buttons: ['I am your bb! 😡'],
        question: `
            Umm... really?? Are you truly my bb?<br>
            Let\'s prove that by answering some questions!<br><br>
            When was our first kiss? 💋 (DD-MM-YY)
        `,
    },
    {
        answer: ['3', 'idiots'],
        buttons: ['Hmmm... He told me but I can\'t remember... 🤔', 'Easy! 💪'],
        question: `
            Oh you know that! Malu I... >.< <br>
            Next question, what is my favourite movie? 🍿
        `,
    },
    {
        answer: ['singapore'],
        buttons: ['Let me use my telephatic power... 🧠'],
        question: `
            Another one, what is my favourite city? 🤓
        `,
    },
    {
        answer: ['respect', 'time'],
        buttons: ['This is tricky...', 'To be sexy...? 🫠'],
        question: `
            Let's switch to a deeper question... <br>
            What is one thing that I am inspired by you? 🥰
        `,
    },
    {
        answer: ['nasi padang', 'bumbu rendang', 'perkedel', 'nangka', 'telur dadar'],
        buttons: ['Must be this! 🍱', 'I won\'t give up.'],
        question: `
            Awww.... 🥰 <br>
            Last but not least.... 😈 <br>
            What is my favourite food?
        `,
    },
    {
        answer: ['pulang'],
        buttons: ['Are you sure? 🤔', 'Not daily geli geli time?? 🥺'],
        question: `
            Okay okay... I am sure you are my bb! 🤍🤍🤍 <br>
            Muahhhhhh.... 💋<br><br>

            Just like our tradition, since you've answered correctly, I give you a wish. <br>
            What is your wish? 🥰
        `,
    },
    {
        buttons: ['OMGGGGG 😭😭😭💗💗💗'],
        image: 'ticket.png',
        title: `
            Well...
        `,
    },
    {
        answer: ['march'],
        buttons: ['Hmmmm..... 🤔'],
        question: `
            Ummm... I <b>might</b> have another gift for you 🥰<br><br>
            But first you have to answer this correctly.<br>
            When did I buy the ticket?
        `,
    },
    {
        answer: ['stay', 'weekend'],
        buttons: ['Muahhhhh! 💋'],
        question: `
            Hehehe.. smart bb! 🥰 Muahhhh! 💋<br>
            Okay... you may have another wish. What is your wish then?
        `,
    },
    {
        buttons: ['YAYYY!!! Cuddle and geli2 time all day 🙈'],
        title: `
            🥰🥰🥰🥰🥰<br><br>
            I would love to stay at your place from Saturday Sept 2nd - Tuesday Sept 5th.<br>
            Then let's arrange a surprise birthday dinner for my mom at the 5th (...or maybe at the 6th 😘).
        `,
    },
    {
        answer: ['letter'],
        buttons: ['I uda basah bb... 😋'],
        question: `
            Okay... one more thing...<br><br>
            I actually have a third gift for you.<br>
            What would that be, my bb? 😘
        `,
    },
    {
        buttons: ['Read my bb\'s first letter to me! 💌'],
        title: `
            Happy 5th monthiversary bb..<br>
            🤍🤍🤍🤍🤍<br><br>
            Here's to 5x5x5x5x5 more months together with you. <br>
            I love you.
        `,
    },
];

const {state, index, next} = useCycleList(slides, {initialValue: slides[0]});

const answer = ref('');
const error = ref('');

function generateError(correct: number, total: number) {
    const percent = Math.floor(correct * 100 / total);

    const messages = [
        'Almost... Almost is never enough... 🥺',
        'Coba tanya Albert lagi deh.. 😉',
        'Don\'t give up bb! You can do this! 🤗',
        'Ganbatte.... 加油! (i bukan wibu >.<)',
        'Ah... u kenal i ga sii... 🧐',
    ];

    return `${messages[Math.floor(Math.random() * messages.length)]} (${percent}%)`;
}

function submit() {
    if (index.value === slides.length - 1) {
        window.location.href = '/onion-koala/letter';
        return;
    }

    if (state.value.question) {
        let correct = 0;
        const correctAnswer = state.value.answer;
        const input = answer.value.toLowerCase();

        correctAnswer.forEach((a) => {
            if (input.includes(a))
                correct++;
        });

        if (correct < correctAnswer.length) {
            error.value = generateError(correct, correctAnswer.length);
            return;
        }
    }

    answer.value = '';
    error.value = '';
    next();
}
</script>

<template>
    <section class="flex-center container-fluid px-container relative h-screen flex-col text-center text-gray">
        <div
            class="absolute right-0 top-0 h-4 w-4"
            @click="next()"
        />

        <img
            v-if="state.image"
            class="skeleton mb-8 rounded-sm"
            :src="`/images/onion-koala/${state.image}`"
            width="420"
            @load="e => e.target.classList.remove('skeleton')"
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
            class="mt-8 w-80 rounded-sm border bg-transparent p-3 focus:outline-hidden"
            rows="3"
        />

        <div
            v-if="error"
            class="mt-2 text-red"
            v-html="error"
        />

        <div class="flex gap-4">
            <button
                v-for="(button, i) in state.buttons"
                :key="i"
                class="mt-8 rounded-sm border px-4 py-2 hover:bg-gray hover:text-black"
                @click="submit()"
            >
                {{ button }}
            </button>
        </div>
    </section>
</template>
