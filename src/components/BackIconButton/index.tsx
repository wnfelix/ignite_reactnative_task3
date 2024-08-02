import React from 'react';
import { Icon, IconButton } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function BackIconButton() {
	const navigation = useNavigation<AppNavigatorRoutesProps>();

	return (
		<IconButton
			borderRadius="full"
			icon={<Icon as={AntDesign} name="arrowleft" color="black" size="xl" />}
			onPress={() => navigation.goBack()}
		/>
	);
}
