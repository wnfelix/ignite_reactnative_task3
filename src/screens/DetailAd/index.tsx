import React, { useCallback, useState } from 'react';
import { Text, Heading, VStack, HStack, useTheme } from 'native-base';
import { Container, ScrollView } from '@styles/global';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { formatNumber } from '@utils/numberUtils';
import { PaymentMethodItem } from '@components/PaymentMethodItem';
import { Avatar } from '@components/Avatar';
import { ImageContainer } from '@components/ImageContainer';
import { Loading } from '@components/Loading';
import productService from '@services/productService';
import { IProduct } from 'src/interfaces';
import { Footer } from './components/Footer';
import { ChipItem } from './styles';
import { Header } from './components/Header';

type RouteParamsProps = {
	id: string;
};

export function DetailAd() {
	const { sizes } = useTheme();
	const route = useRoute();
	const { id } = route.params as RouteParamsProps;

	const [isLoading, setIsLoading] = useState(true);
	const [adItem, setAdItem] = useState<IProduct>({} as IProduct);

	async function fetchProduct() {
		const data = await productService.getOne(id);

		// setAdItem(data);
		setAdItem({ ...data });
		setIsLoading(false);
	}

	useFocusEffect(
		useCallback(() => {
			fetchProduct();
		}, [])
	);

	return (
		<Container>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<Header id={id} />
					<ScrollView>
						<ImageContainer
							photos={adItem.product_images.map(pi => ({
								id: pi.id,
								name: pi.id,
								uri: productService.getPhotoUri(pi.path),
								type: '',
								disabled: !adItem.is_active,
							}))}
						/>
						<VStack p={5} space={3}>
							<HStack space={2} alignItems="center">
								<Avatar avatar={adItem.user.avatar} size={sizes[2]} />
								<Text>{adItem.user.name}</Text>
							</HStack>
							<ChipItem title={!adItem.is_new ? 'USADO' : 'NOVO'} />
							<HStack
								justifyContent="space-between"
								flexWrap="wrap"
								alignItems="center"
								space="3"
							>
								<Heading>{adItem.name}</Heading>
								<HStack flexDirection="row" alignItems="flex-end" space={1}>
									<Text fontSize={16} pb={1} color={'blue.light'} bold>
										R$
									</Text>
									<Text fontSize={24} color={'blue.light'} bold>
										{formatNumber(adItem.price)}
									</Text>
								</HStack>
							</HStack>
							<Text>{adItem.description}</Text>
							<HStack space={2}>
								<Text bold>Aceita troca?</Text>
								<Text>{adItem.accept_trade ? 'Sim' : 'Não'}</Text>
							</HStack>
							<VStack space={1}>
								{adItem.payment_methods.map(item => (
									<PaymentMethodItem key={item.key} item={item} />
								))}
							</VStack>
						</VStack>
					</ScrollView>
					<Footer {...adItem} />
				</>
			)}
		</Container>
	);
}
