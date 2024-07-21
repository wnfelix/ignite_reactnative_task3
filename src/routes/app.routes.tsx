import { Platform, TouchableOpacity } from 'react-native';
import { Icon, useTheme } from 'native-base';
import {
	createBottomTabNavigator,
	BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {
	createStackNavigator,
	StackNavigationProp,
} from '@react-navigation/stack';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

import { IPhotoFile, IProduct } from 'src/interfaces';
import { Home } from '@screens/Home';
import { NewAd } from '@screens/NewAd';
import { PreviewAd } from '@screens/PreviewAd';
import { useAuth } from '@hooks/useAuth';

type TabAppRoutes = {
	home: undefined;
	myAds: undefined;
	signOut: undefined;
};

type StackAppRoutes = {
	main: undefined;
	newAd: undefined;
	previewAd: Omit<IProduct, 'id' | 'product_images' | 'user'> & {
		photos: IPhotoFile[];
	};
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<TabAppRoutes>;
export type AppStackNavigatorRoutesProps = StackNavigationProp<StackAppRoutes>;

const Tab = createBottomTabNavigator<TabAppRoutes>();
const Stack = createStackNavigator<StackAppRoutes>();

function TabRoutes() {
	const { sizes, colors } = useTheme();
	const { signOut } = useAuth();
	const iconSize = sizes[2];

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: colors.black,
				tabBarInactiveTintColor: colors.gray[400],
				tabBarStyle: {
					borderTopWidth: 0,
					height: Platform.OS === 'android' ? 'auto' : 96,
					paddingBottom: sizes[7],
					paddingTop: sizes[7],
				},
			}}
		>
			<Tab.Screen
				name="home"
				component={Home}
				options={{
					tabBarIcon: ({ color }) => (
						<Icon as={AntDesign} name="home" size={iconSize} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="myAds"
				component={Home}
				options={{
					tabBarIcon: ({ color }) => (
						<Icon as={Feather} name="tag" size={iconSize} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="signOut"
				options={{
					tabBarIcon: ({ color }) => (
						<TouchableOpacity
							onPress={signOut}
							style={{ justifyContent: 'center' }}
						>
							<Icon
								as={Ionicons}
								name="exit-outline"
								size={iconSize}
								color={color}
							/>
						</TouchableOpacity>
					),
				}}
			>
				{() => null}
			</Tab.Screen>
		</Tab.Navigator>
	);
}

export function AppRoutes() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="main" component={TabRoutes} />
			<Stack.Screen name="newAd" component={NewAd} />
			<Stack.Screen name="previewAd" component={PreviewAd} />
		</Stack.Navigator>
	);
}
