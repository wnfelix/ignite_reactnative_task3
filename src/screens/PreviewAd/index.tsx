import React from 'react';
import { Text, Heading, VStack, HStack } from 'native-base';
import { Container } from '@styles/global';
import { Avatar } from '@components/Avatar';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { IProduct } from 'src/interfaces';

type RouteParamsProps = Pick<
	IProduct,
	'name' | 'description' | 'accept_trade'
> & {};

export function PreviewAd() {
	const { user } = useAuth();
	const route = useRoute();
	const entity = route.params as RouteParamsProps;

	return (
		<Container>
			<VStack>
				<Heading>Pré visualização do anúncio</Heading>
				<Text>É assim que seu produto vai aparecer!</Text>
			</VStack>
			<HStack>
				<Avatar avatar={user.avatar} size={6} />
				<Text>Maria Gomes</Text>
			</HStack>
		</Container>
	);
}
