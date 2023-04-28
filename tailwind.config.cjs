/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,vue}'],
    safelist: [
        {pattern: /text-(black|gray|red|white)/},
    ],
    theme: {
        colors: {
            black: '#1D1D1B',
            gray: '#CBCBCB',
            red: '#9B3629',
            white: '#F4F4F4',
        },
        extend: {
            cursor: {
                'arrow-left': 'url(/images/arrow-left.svg) 46 46, w-resize',
                'arrow-right': 'url(/images/arrow-right.svg) 46 46, e-resize',
            },
            screens: {
                '3xl': '1920px',
            },
        },
        fontFamily: {
            sans: ['TT Commons', 'ui-sans-serif', 'system-ui'],
        },
    },
};
