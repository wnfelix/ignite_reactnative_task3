import { Platform } from 'react-native';
import {
	createBottomTabNavigator,
	BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { Home } from '@screens/Home';

import { AntDesign, Feather } from '@expo/vector-icons';
import { Icon, useTheme } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

type AppRoutes = {
	home: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
	const { sizes, colors } = useTheme();

	const iconSize = sizes[2];

	return (
		<Navigator
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
			<Screen
				name="home"
				component={Home}
				options={{
					tabBarIcon: ({ color }) => (
						<Icon as={AntDesign} name="home" size={iconSize} color={color} />
					),
				}}
			/>
			<Screen
				name="myadds"
				component={Home}
				options={{
					tabBarIcon: ({ color }) => (
						<Icon as={Feather} name="tag" size={iconSize} color={color} />
					),
				}}
			/>
			<Screen
				name="signout"
				component={Home}
				options={{
					tabBarIcon: ({ color }) => (
						<Icon
							as={Ionicons}
							name="exit-outline"
							size={iconSize}
							color={color}
						/>
					),
				}}
			/>
		</Navigator>
	);
}
