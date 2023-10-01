export default {
	plugins: [],
	theme: {
		fontFamily: {
			sans: ['lato'],
			logo: ['raleway']
		},
		colors: {
			blue: '#34ace0',
			red: '#e03456',
			white: '#ffffff',
			black: '#1e272e'
		},
		extend: {}
	},
	purge: ['./index.html', './src/**/*.{svelte,js,ts}'], //for unused css
	variants: {
		extend: {}
	},
	darkmode: false // or 'media' or 'class'
};
