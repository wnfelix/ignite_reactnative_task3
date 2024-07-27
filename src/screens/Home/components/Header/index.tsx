import React from 'react';
import { VStack, Text, Heading, HStack } from 'native-base';
import { useAuth } from '@hooks/useAuth';
import { Container, AddButton, AddIcon } from './styles';
import { useNavigation } from '@react-navigation/native';
import {
	AppNavigatorRoutesProps,
	AppStackNavigatorRoutesProps,
} from '@routes/app.routes';
import { Avatar } from '@components/Avatar';

export function Header() {
	const { user } = useAuth();
	const navigation = useNavigation<AppStackNavigatorRoutesProps>();

	return (
		<Container>
			<Avatar avatar={user.avatar} size={12} />
			<VStack>
				<Text fontSize={16}>Boas vindas,</Text>
				<Heading fontSize={16}>{user.name.split(' ')[0]}!</Heading>
			</VStack>
			<AddButton onPress={() => navigation.navigate('newAd')}>
				<HStack space={2} alignItems="center">
					<AddIcon name="plus" />
					<Text bold fontSize={12} color="white" letterSpacing={1}>
						Criar anúncio
					</Text>
				</HStack>
			</AddButton>
		</Container>
	);
}
