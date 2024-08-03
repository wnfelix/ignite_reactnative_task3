import React, { useState } from 'react';
import { Linking } from 'react-native';
import { Text, HStack, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { IProduct } from 'src/interfaces';
import { FontAwesome } from '@expo/vector-icons';
import productService from '@services/productService';
import { formatNumber } from '@utils/numberUtils';
import { tryCatch } from '@utils/utils';
import { ActionButton } from './components/ActionButton';
import { ContactButton, FooterBuy, FooterMyAd } from './styles';
import { Price } from '@components/Price';

interface IFooterProps extends IProduct {}

export function Footer(props: IFooterProps) {
	const { user } = useAuth();
	const toast = useToast();
	const navigator = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const [isActive, setIsActive] = useState(props.is_active ?? false);

	async function handleDisableAd() {
		const newStatus = !isActive;
		await tryCatch({
			tryMethod: async () => {
				setIsLoading(true);
				setIsActive(newStatus);
				await productService.changeStatus(props.id, newStatus);

				navigator.goBack();
			},
			finallyMethod: () => setIsLoading(false),
			successMessage: `Anúncio ${
				newStatus ? 'ativado' : 'desativado'
			} com sucesso`,
			errorMessage:
				'Não foi possível ativar/desativar o anúncio, tente novamente mais tarde',
			toast: toast,
		});
	}

	async function handleDeleteAd() {
		await tryCatch({
			tryMethod: async () => {
				setIsLoading(true);
				await productService.deleteProduct(props.id);

				navigator.goBack();
			},
			finallyMethod: () => setIsLoading(false),
			successMessage: 'Anúncio apagado com sucesso',
			errorMessage:
				'Não foi possível apagar o anúncio, tente novamente mais tarde',
			toast: toast,
		});
	}

	async function handleContactWhatsApp() {
		const {
			user: { tel, name },
		} = props;
		const message = `Olá ${name}, fiquei interessado no seu anúncio ${props.name} e gostaria de negociar`;
		const url = `whatsapp://send?text=${encodeURIComponent(
			message
		)}&phone=55${tel}`;
		Linking.openURL(url);
	}

	return props.user.avatar !== user.avatar ? (
		<FooterBuy>
			<Price value={props.price} color="blue.light" fontSize={28} />
			<ContactButton onPress={handleContactWhatsApp}>
				<HStack space={2}>
					<FontAwesome name="whatsapp" size={24} color="white" />
					<Text color="white">Entrar em contato</Text>
				</HStack>
			</ContactButton>
		</FooterBuy>
	) : (
		<FooterMyAd>
			<ActionButton
				action={isActive ? 'deactivate' : 'activate'}
				isLoading={isLoading}
				onPress={handleDisableAd}
			/>
			<ActionButton
				action="delete"
				isLoading={isLoading}
				onPress={handleDeleteAd}
			/>
		</FooterMyAd>
	);
}
