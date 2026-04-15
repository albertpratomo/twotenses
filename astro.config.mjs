import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel/serverless'
import vue from '@astrojs/vue'
import {storyblok} from '@storyblok/astro'
import tailwindcss from '@tailwindcss/vite'
import {defineConfig} from 'astro/config'
import {loadEnv} from 'vite'

const env = loadEnv('', process.cwd(), '')
const ssr = env.SSR === 'true'

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
        FullImage: 'storyblok/FullImage',
        Header: 'storyblok/Header',
        Hero: 'storyblok/Hero',
        HeroCarousel: 'storyblok/HeroCarousel',
        ImageParagraph: 'storyblok/ImageParagraph',
        Index: 'storyblok/Index',
        ListHoverable: 'storyblok/ListHoverable',
        LogosGrid: 'storyblok/LogosGrid',
        ModelParagraph: 'storyblok/ModelParagraph',
        OneImage: 'storyblok/OneImage',
        OneImageLink: 'storyblok/OneImageLink',
        OneParagraph: 'storyblok/OneParagraph',
        Page: 'storyblok/Page',
        ParagraphImageGrid: 'storyblok/ParagraphImageGrid',
        ParagraphLink: 'storyblok/ParagraphLink',
        Project: 'storyblok/Project',
        ProjectInfo: 'storyblok/ProjectInfo',
        ProjectsGrid: 'storyblok/ProjectsGrid',
        ServiceList: 'storyblok/ServiceList',
        TeamGrid: 'storyblok/TeamGrid',
        TextsGrid: 'storyblok/TextsGrid',
        TitleParagraph: 'storyblok/TitleParagraph',
        TwoImage: 'storyblok/TwoImage',
        TwoImagesBottomAlignedA: 'storyblok/TwoImagesBottomAlignedA',
        TwoImagesBottomAlignedB: 'storyblok/TwoImagesBottomAlignedB',
        TwoImagesLeftTopRightBottom: 'storyblok/TwoImagesLeftTopRightBottom',
        TwoImagesTopAlignedA: 'storyblok/TwoImagesTopAlignedA',
      },
    }),
    sitemap({
      filter: p => !p.includes('onion-koala'),
    }),
    vue({
      script: {
        defineModel: true,
      },
    }),
  ],

  output: ssr ? 'server' : 'static',
  site: 'https://www.twotenses.com',

  vite: {
    plugins: [tailwindcss()],
  },
})
