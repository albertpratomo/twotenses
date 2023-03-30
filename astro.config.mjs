import {defineConfig} from 'astro/config';
import storyblok from '@storyblok/astro';
import {loadEnv} from 'vite';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

const env = loadEnv('', process.cwd(), '');

const ssr = env.SSR === 'true';

export default defineConfig({
    adapter: ssr ? vercel() : undefined,
    integrations: [
        storyblok({
            accessToken: env.STORYBLOK_TOKEN,
            bridge: ssr,
            components: {
                Headline: 'storyblok/Headline',
                Hero: 'storyblok/Hero',
                Page: 'storyblok/Page',
            },
        }),
        tailwind(),
    ],
    output: ssr ? 'server' : 'static',
});
