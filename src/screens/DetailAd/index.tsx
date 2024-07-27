import React, { useCallback, useState } from 'react';
import {
	Text,
	Heading,
	VStack,
	HStack,
	useTheme,
	View,
	Icon,
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { Container, ScrollView } from '@styles/global';
import {
	useFocusEffect,
	useNavigation,
	useRoute,
} from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useAuth } from '@hooks/useAuth';
import { formatNumber } from '@utils/numberUtils';
import { PaymentMethodItem } from '@components/PaymentMethodItem';
import { Avatar } from '@components/Avatar';
import { ImageContainer } from '@components/ImageContainer';
import { Loading } from '@components/Loading';
import productService from '@services/productService';
import { IProduct } from 'src/interfaces';
import { Footer } from './components/Footer';
import { ChipItem } from './styles';

type RouteParamsProps = {
	id: string;
};

export function DetailAd() {
	const { user } = useAuth();
	const navigation = useNavigation<AppNavigatorRoutesProps>();
	const { sizes } = useTheme();
	const route = useRoute();
	const { id } = route.params as RouteParamsProps;

	const [isLoading, setIsLoading] = useState(true);
	const [adItem, setAdItem] = useState<IProduct>({} as IProduct);

	async function fetchProduct() {
		const data = await productService.getOne(id);

		setAdItem(data);
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
					<VStack p={5}>
						<Icon
							as={AntDesign}
							name="arrowleft"
							color="black"
							size="xl"
							onPress={() => navigation.goBack()}
						/>
					</VStack>
					<ScrollView>
						<ImageContainer
							photos={adItem.product_images.map(pi => ({
								id: pi.id,
								name: pi.id,
								uri: productService.getPhotoUri(pi.path),
								type: '',
							}))}
						/>
						<VStack p={5} space={3}>
							<HStack space={2} alignItems="center">
								<Avatar avatar={user.avatar} size={sizes[2]} />
								<Text>{user.name}</Text>
							</HStack>
							<ChipItem title={!adItem.is_new ? 'USADO' : 'NOVO'} />
							<HStack justifyContent="space-between" flexWrap="wrap">
								<Heading>{adItem.name}</Heading>
								<View flexDirection="row" alignItems="flex-end">
									<Text fontSize={16} pb={1} color={'blue.light'} bold>
										R$
									</Text>
									<Text fontSize={28} color={'blue.light'} bold>
										{formatNumber(adItem.price)}
									</Text>
								</View>
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
