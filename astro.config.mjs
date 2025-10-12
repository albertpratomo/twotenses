import {defineConfig} from 'astro/config';
import {loadEnv} from 'vite';
import sitemap from '@astrojs/sitemap';
import {storyblok} from '@storyblok/astro';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import vue from '@astrojs/vue';

const env = loadEnv('', process.cwd(), '');
const ssr = env.SSR === 'true';

export default defineConfig({
    adapter: ssr ? vercel() : undefined,
    integrations: [
        storyblok({
            accessToken: env.STORYBLOK_TOKEN,
            bridge: ssr,
            components: {
                Accordion: 'storyblok/Accordion',
                ArrowLink: 'storyblok/ArrowLink',
                Carousel: 'storyblok/Carousel',
                ClientTimeline: 'storyblok/ClientTimeline',
                Contact: 'storyblok/Contact',
                Counter: 'storyblok/Counter',
                FullImage: 'storyblok/FullImage',
                Header: 'storyblok/Header',
                Hero: 'storyblok/Hero',
                ImageParagraph: 'storyblok/ImageParagraph',
                Index: 'storyblok/Index',
                LogosGrid: 'storyblok/LogosGrid',
                ModelParagraph: 'storyblok/ModelParagraph',
                OneImage: 'storyblok/OneImage',
                OneParagraph: 'storyblok/OneParagraph',
                Page: 'storyblok/Page',
                ParagraphImageGrid: 'storyblok/ParagraphImageGrid',
                Project: 'storyblok/Project',
                ProjectInfo: 'storyblok/ProjectInfo',
                ProjectsGrid: 'storyblok/ProjectsGrid',
                ServiceList: 'storyblok/ServiceList',
                TextsGrid: 'storyblok/TextsGrid',
                TitleParagraph: 'storyblok/TitleParagraph',
                TwoImage: 'storyblok/TwoImage',
            },
        }),
        sitemap({
            filter: p => !p.includes('onion-koala'),
        }),
        tailwind({config: {applyBaseStyles: false}}),
        vue({
            script: {
                defineModel: true,
            },
        }),
    ],
    output: ssr ? 'server' : 'static',
    site: 'https://www.twotenses.com',
});
