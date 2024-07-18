import React from 'react';
import { Text, Heading, VStack, HStack, useTheme } from 'native-base';
import { Container, ScrollView } from '@styles/global';
import { Avatar } from '@components/Avatar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { IProduct } from 'src/interfaces';
import { AdItemChip } from '@components/AdItemChip';
import { formatCurrency } from '@utils/numberUtils';
import { PaymentMethodItem } from '@components/PaymentMethodItem';
import { Footer } from './styles';
import { Button } from '@components/Button';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

type RouteParamsProps = Omit<IProduct, 'id' | 'user'> & {};

export function PreviewAd() {
	const navigation = useNavigation<AppNavigatorRoutesProps>();
	const { user } = useAuth();
	const route = useRoute();
	const newAd = route.params as RouteParamsProps;
	const { sizes } = useTheme();

	return (
		<Container>
			<ScrollView>
				<VStack pt={8} pb={5} alignItems="center" bg={'blue.light'}>
					<Heading fontSize="md" color={'white'}>
						Pré visualização do anúncio
					</Heading>
					<Text color="white">É assim que seu produto vai aparecer!</Text>
				</VStack>
				<Text>As fotos vão aqui</Text>
				<VStack p={5} space={4}>
					<HStack space={2} alignItems={'center'}>
						<Avatar avatar={user.avatar} size={sizes[2]} />
						<Text>{user.name}</Text>
					</HStack>
					<AdItemChip used={!newAd.is_new} mr="auto" />
					<HStack justifyContent="space-between">
						<Heading>{newAd.name}</Heading>
						<Text>{formatCurrency(newAd.price)}</Text>
					</HStack>
					<Text>{newAd.description}</Text>
					<HStack space={2}>
						<Text bold>Aceita troca?</Text>
						<Text>{newAd.accept_trade ? 'Sim' : 'Não'}</Text>
					</HStack>
					<VStack space={1}>
						{newAd.payment_methods.map(item => (
							<PaymentMethodItem key={item.key} item={item} />
						))}
					</VStack>
				</VStack>
			</ScrollView>
			<Footer>
				<Button
					borderRadius={6}
					width="2/5"
					onPress={() => navigation.goBack()}
				>
					<Text color="black" bold>
						Voltar e editar
					</Text>
				</Button>
				<Button borderRadius={6} width="2/5" bgColor="black">
					<Text color="white">Publicar</Text>
				</Button>
			</Footer>
		</Container>
	);
}
