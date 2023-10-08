export default {
	plugins: [],
	theme: {
		fontFamily: {
			sans: ['"Open Sans"'],
			logo: ['raleway']
		},
		colors: {
			blue: '#34ace0',
			red: '#e03456',
			white: '#ffffff',
			black: '#1e272e',
			dark_blue: '#357DED',
			off_black: '#373F51'
		},
		extend: {}
	},
	purge: ['./index.html', './src/**/*.{svelte,js,ts}'], //for unused css
	variants: {
		extend: {}
	},
	darkmode: false // or 'media' or 'class'
};
