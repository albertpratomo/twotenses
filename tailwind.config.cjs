/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,vue}'],
    theme: {
        colors: {
            black: '#1D1D1B',
            gray: '#CBCBCB',
            red: '#9B3629',
            white: '#F4F4F4',
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                md: '2rem',
                xl: '1rem',
            },
        },
        extend: {},
        fontFamily: {
            sans: ['TT Commons', 'ui-sans-serif', 'system-ui'],
        },
    },
};
