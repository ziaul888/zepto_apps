module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				sm: "2rem",
				lg: "4rem",
				xl: "5rem",
				"2xl": "6rem",
			},
		},
		extend: {
			colors: {
				blue: {
					500: "#3b82f6",
					600: "#2d68ff",
				},
				"dark-gray": {
					800: "#3a434f",
					900: "#1e222d",
				},
				gray: {
					200: "#f2f5f8",
					400: "rgba(164, 170, 176, 0.32)",
					800: "#0e1114",
					950: "#070e17",
				},
				primary: {
					blue: "#3f75ff",
					deepBlue: "#0c1725",
				},
			},
			fontFamily: {
				Inter: ["'Inter'", "sans-serif"],
			},
			backgroundImage: {
				"home-hero-gradient":
					"linear-gradient(180deg, #111B34 0%, #0E121C 60%)",
				"home-gradient": "linear-gradient(180deg, #0A1422, #070A10 57.28%)",
				"home-lite-gradient":
					"linear-gradient(151.41deg, #3D48A8 -10.72%, #0D131D 59.39%)",
				"home-avocado-gradient":
					"linear-gradient(180deg, #173B1A 7.79%, #040608 86.63%)",
				"linear-gradient-black":
					"linear-gradient(180deg, #1D1D1D, #040404)",
				"linear-gradient-blue": "linear-gradient(180deg, #4E80EE, #336EF1)",
				"linear-gradient-footer":
					"linear-gradient(180deg, #0A1422, #070A10 57.28%)",
				"linear-gradient-green":
					"linear-gradient(180deg, #53AE5C, #47A550)",
				"linear-gradient-lite":
					"linear-gradient(151.41deg, #3D48A8 -10.72%, #0D131D 59.39%)",
				"linear-gradient-white": "linear-gradient(180deg, #fff, #C8C8C8)",
			},
		},
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
		// Other plugins
	  ]
};
