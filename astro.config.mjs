import {defineConfig} from 'astro/config';
import storyblok from '@storyblok/astro';
import {loadEnv} from 'vite';
import tailwind from '@astrojs/tailwind';

const env = loadEnv('', process.cwd(), 'STORYBLOK');

export default defineConfig({
    integrations: [
        storyblok({
            accessToken: env.STORYBLOK_TOKEN,
            components: {
                Headline: 'storyblok/Headline',
                Hero: 'storyblok/Hero',
                Page: 'storyblok/Page',
            },
        }),
        tailwind(),
    ],
});
