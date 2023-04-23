export interface ISbImage {
    alt: string
    filename: string
    title: string
}

export default function formatImage(image: ISbImage) {
    return {
        alt: image.alt,
        title: image.title,
        url: `${image.filename}/m/`,
    };
}
