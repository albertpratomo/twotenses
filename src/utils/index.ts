export interface ISbImage {
    alt: string
    filename: string
    title: string
}

export function getSrcset(image: ISbImage, width: number, height = 0) {
    const url = `${image.filename}/m/`;

    return `
        ${url}${width * 2}x${height * 2} 2x,
        ${url}${width}x${height}
    `;
}

interface ISbLink {
    cached_url: string
    target?: string
}

export function formatLink(link: ISbLink) {
    const href = link.cached_url.startsWith('http')
        ? link.cached_url
        : `/${link.cached_url === 'home' ? '' : link.cached_url}`;

    const target = link.target || '_self';

    return {
        href,
        target,
    };
}
