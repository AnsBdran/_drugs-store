import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				'2xl': '1400px'
			}
		},

		extend: {
			// container: {
			// 	center: true,
			// 	padding: '1rem',
			// 	screens: {
			// 		sm: '640px', // Default sm breakpoint
			// 		md: '768px',
			// 		lg: '1024px',
			// 		xl: '1280px',
			// 		'2xl': '1536px'
			// 	}
			// },
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			},
			screens: {
				xs: '350px',
				'900': '900px'
			},
			spacing: {
				header: 'var(--header)',
				sidebar: 'var(--sidebar)',
				'bottom-navbar': 'var(--bottom-navbar)'
			},
			// keyframes: {
			//     marquee: {
			//         '0%': {transform: 'translateX(0%)'},
			//         '100%': {transform: 'translateX(-100%)'}
			//     },
			//     _marquee: {
			//         '0%': {transform: 'translateX(100%)'},
			//         '100%': {transform: 'translateX(0%)'},
			//     }
			// },
			// animation: {
			//     marquee: 'marquee 2s linear infinite',
			//     _marquee: '_marquee 2s linear infinite',
			// },
			animation: {
				marquee: 'marquee 15s linear infinite',
				_marquee: '_marquee 15s linear infinite'
			},
			keyframes: {
				marquee: {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				_marquee: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0%)' }
				}
			}
		}
	}
};

export default config;
