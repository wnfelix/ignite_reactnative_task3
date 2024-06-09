import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import { Routes } from "@routes/index";
import { Theme } from "src/theme";

export default function App() {
	return (
		<NativeBaseProvider isSSR={false} theme={Theme}>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<Routes />
		</NativeBaseProvider>
	);
}
