interface ISbLink {
    cached_url: string
    target?: string
}

export default function formatLink(link: ISbLink) {
    const href = link.cached_url.startsWith('http')
        ? link.cached_url
        : `/${link.cached_url === 'home' ? '' : link.cached_url}`;

    const target = link.target || '_self';

    return {
        href,
        target,
    };
}
