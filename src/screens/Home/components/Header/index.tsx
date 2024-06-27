import React from 'react';
import { VStack, Text, Heading, HStack } from 'native-base';
import { api } from '@services/api';
import { useAuth } from '@hooks/useAuth';
import { AvatarImage, Container, AddButton, AddIcon } from './styles';

export function Header() {
	const { user } = useAuth();

	return (
		<Container>
			<AvatarImage
				source={{ uri: `${api.defaults.baseURL}images/${user.avatar}` }}
				alt="avatar"
			/>
			<VStack>
				<Text fontSize={16}>Boas vindas,</Text>
				<Heading fontSize={16}>{user.name.split(' ')[0]}!</Heading>
			</VStack>
			<AddButton>
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
