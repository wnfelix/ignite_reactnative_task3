import { extendTheme } from "native-base";

export const Theme = extendTheme({
	components: {
		Input: {
			baseStyle: {
				backgroundColor: "white",
				rounded: "lg",
				_focus: {
					borderColor: "blue.light",
				},
			},
		},
		Button: {
			baseStyle: {
				backgroundColor: "gray.500",
			},
		},
	},
	colors: {
		blue: {
			normal: "#364D9D",
			light: "#647AC7",
		},
		red: {
			light: "#EE7979",
		},
		gray: {
			100: "#1A181B",
			200: "#3E3A40",
			300: "#5F5B62",
			400: "#9F9BA1",
			500: "#D9D8DA",
			600: "#EDECEE",
			700: "#F7F7F8",
		},
		white: "#FFFFFF",
	},
	// fonts: {
	// 	heading: "Roboto_700Bold",
	// 	body: "Roboto_400Regular",
	// },
	fontSizes: {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18,
		xl: 32,
	},
	// sizes: {
	// 	14: 56,
	// 	33: 148,
	// },
});
