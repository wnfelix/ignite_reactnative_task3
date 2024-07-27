import React, { useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { IProduct } from 'src/interfaces';
import { ContactButton, FooterBuy, FooterMyAd } from './styles';
import { View, Text, HStack, useToast } from 'native-base';
import { formatNumber } from '@utils/numberUtils';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ActionButton } from './components/ActionButton';
import productService from '@services/productService';
import { tryCatch } from '@utils/utils';

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

	return props.user.avatar !== user.avatar ? (
		<FooterBuy>
			<HStack flexDirection="row" alignItems="flex-end" space={1}>
				<Text color="blue.light" fontSize={16} pb={1} bold>
					R$
				</Text>
				<Text color="blue.light" fontSize={28} bold>
					{formatNumber(props.price)}
				</Text>
			</HStack>
			<ContactButton>
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
