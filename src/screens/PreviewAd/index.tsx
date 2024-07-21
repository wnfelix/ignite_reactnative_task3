import React, { useState } from 'react';
import {
	Text,
	Heading,
	VStack,
	HStack,
	useTheme,
	View,
	useToast,
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { Container, ScrollView } from '@styles/global';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { formatNumber } from '@utils/numberUtils';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { PaymentMethodItem } from '@components/PaymentMethodItem';
import { Avatar } from '@components/Avatar';
import { Button } from '@components/Button';
import { Chip } from '@components/Chip';
import productService from '@services/productService';
import { AppError } from '@utils/AppError';
import { IPhotoFile, IProduct } from 'src/interfaces';
import { ImageContainer } from './components/ImageContainer';
import { Footer } from './styles';

type RouteParamsProps = Omit<IProduct, 'id' | 'user'> & {
	photos: IPhotoFile[];
};

export function PreviewAd() {
	const { user } = useAuth();
	const { sizes } = useTheme();
	const toast = useToast();
	const navigation = useNavigation<AppNavigatorRoutesProps>();
	const route = useRoute();

	const [isLoading, setIsLoading] = useState(false);

	const newAd = route.params as RouteParamsProps;

	async function handlePublish() {
		setIsLoading(true);

		try {
			const { data: product } = await productService.create(newAd);
			await productService.addPhotos(product.id, newAd.photos);

			toast.show({
				title: 'Anúncio cadastrado com sucesso!!',
				placement: 'top',
				bgColor: 'green.500',
			});
			navigation.navigate('home');
		} catch (error) {
			const isAppError = error instanceof AppError;
			const title = isAppError
				? error.message
				: 'Não foi possível fazer login, tente novamente mais tarde!';

			toast.show({
				title: title,
				placement: 'top',
				bgColor: 'red.500',
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Container>
			<ScrollView>
				<VStack pt={8} pb={5} alignItems="center" bg={'blue.light'}>
					<Heading fontSize="md" color={'white'}>
						Pré visualização do anúncio
					</Heading>
					<Text color="white">É assim que seu produto vai aparecer!</Text>
				</VStack>
				<ImageContainer photos={newAd.photos} />
				<VStack p={5} space={3}>
					<HStack space={2} alignItems={'center'}>
						<Avatar avatar={user.avatar} size={sizes[2]} />
						<Text>{user.name}</Text>
					</HStack>
					<Chip
						mr="auto"
						bg="gray.500"
						color="black"
						title={!newAd.is_new ? 'USADO' : 'NOVO'}
						borderWidth={0}
						bold
					/>
					<HStack justifyContent="space-between" flexWrap={'wrap'}>
						<Heading>{newAd.name}</Heading>
						<View flexDirection={'row'} alignItems={'flex-end'}>
							<Text fontSize={16} pb={1} color={'blue.light'} bold>
								R$
							</Text>
							<Text fontSize={28} color={'blue.light'} bold>
								{formatNumber(newAd.price)}
							</Text>
						</View>
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
					flex={1}
					onPress={() => navigation.goBack()}
					flexDirection="row"
				>
					<HStack space={2}>
						<AntDesign name="arrowleft" size={24} color="black" />
						<Text color="black" bold>
							Voltar e editar
						</Text>
					</HStack>
				</Button>
				<Button
					borderRadius={6}
					flex={1}
					bgColor="blue.light"
					isLoading={isLoading}
					onPress={handlePublish}
				>
					<HStack space={2}>
						<AntDesign name="tago" size={24} color="white" />
						<Text color="white">Publicar</Text>
					</HStack>
				</Button>
			</Footer>
		</Container>
	);
}
