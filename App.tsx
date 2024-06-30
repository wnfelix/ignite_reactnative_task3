import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { Routes } from '@routes/index';
import { Theme } from 'src/theme';
import { AuthContextProvider } from '@contexts/AuthContext';
import {
	useFonts,
	Karla_400Regular,
	Karla_700Bold,
} from '@expo-google-fonts/karla';
import { Loading } from '@components/Loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

export default function App() {
	const [fontsLoaded] = useFonts({
		Karla_400Regular,
		Karla_700Bold,
	});

	return (
		<NativeBaseProvider isSSR={false} theme={Theme}>
			<StatusBar
				barStyle="dark-content"
				backgroundColor="transparent"
				translucent
			/>
			<AuthContextProvider>
				<PaperProvider>
					<GestureHandlerRootView style={{ flex: 1 }}>
						{fontsLoaded ? <Routes /> : <Loading />}
					</GestureHandlerRootView>
				</PaperProvider>
			</AuthContextProvider>
		</NativeBaseProvider>
	);
}
