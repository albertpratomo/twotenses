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
