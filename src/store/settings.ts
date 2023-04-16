import {useStoryblokApi} from '@storyblok/astro';

const api = useStoryblokApi();

const {data: {story: {content}}} = await api.get('cdn/stories/settings', {
    version: import.meta.env.DEV ? 'draft' : 'published',
});

export default content;
