import React from 'react';
import { HStack, Icon, IconButton } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

interface IHeaderProps {
	id: string;
}

export function Header({ id }: IHeaderProps) {
	const navigation = useNavigation<AppNavigatorRoutesProps>();

	return (
		<HStack justifyContent="space-between" p={1}>
			<IconButton
				borderRadius="full"
				icon={<Icon as={AntDesign} name="arrowleft" color="black" size="xl" />}
				onPress={() => navigation.goBack()}
			/>
			<IconButton
				borderRadius="full"
				icon={<Icon as={AntDesign} name="edit" color="black" size="xl" />}
			/>
		</HStack>
	);
}
