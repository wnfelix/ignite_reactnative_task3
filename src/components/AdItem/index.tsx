import React from 'react';
import { Container, AdItemImage, Header, AvatarImage, Overlay } from './styles';
import { Text } from 'native-base';
import { formatCurrency } from '@utils/numberUtils';
import { api } from '@services/api';
import { TouchableOpacity, TouchableWithoutFeedbackProps } from 'react-native';
import { IProduct } from 'src/interfaces';
import productService from '@services/productService';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigatorRoutesProps } from '@routes/app.routes';
import { Chip } from '@components/Chip';

interface IAdItemProps
	extends IProduct,
		Pick<TouchableWithoutFeedbackProps, 'onPress'> {
	showUser?: boolean;
}

export function AdItem({
	is_active = true,
	showUser = true,
	onPress,
	...props
}: IAdItemProps) {
	const navigator = useNavigation<AppStackNavigatorRoutesProps>();

	function handleDetailAd() {
		navigator.navigate('detailAd', { id: props.id });
	}

	return (
		<Container>
			<TouchableOpacity onPress={onPress ?? handleDetailAd}>
				<AdItemImage
					source={{
						uri: productService.getPhotoUri(props.product_images[0].path),
					}}
					alt={props.name}
				/>
				{!is_active && <Overlay />}
			</TouchableOpacity>
			<Header active={is_active}>
				{showUser && (
					<AvatarImage
						source={{
							uri: `${api.defaults.baseURL}images/${props.user.avatar}`,
						}}
						alt="avatar"
					/>
				)}
				<Chip
					bg={!props.is_new ? 'gray.200' : 'primary.600'}
					title={!props.is_new ? 'USADO' : 'NOVO'}
					ml="auto"
				/>
			</Header>
			{!is_active && (
				<Text
					bold
					position="absolute"
					color="white"
					mt={16}
					p={2}
					fontSize="xs"
				>
					ANÚNCIO DESATIVADO
				</Text>
			)}
			<Text color={is_active ? 'black' : 'gray.400'}>{props.name}</Text>
			<Text bold color={is_active ? 'black' : 'gray.400'}>
				{formatCurrency(props.price)}
			</Text>
		</Container>
	);
}
