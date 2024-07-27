import React, { useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { IProduct } from 'src/interfaces';
import {
	ContactButton,
	DeleteButton,
	FooterBuy,
	FooterMyAd,
	InativeButton,
} from './styles';
import { View, Text, HStack } from 'native-base';
import { formatNumber } from '@utils/numberUtils';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface IFooterProps extends IProduct {}

export function Footer(props: IFooterProps) {
	const { user } = useAuth();
	const navigator = useNavigation();
	const [isLoading, setIsLoading] = useState(false);

	function handleDisableAd() {}

	function handleDeleteAd() {}

	return props.user.avatar !== user.avatar ? (
		<FooterBuy>
			<View flexDirection="row" alignItems="flex-end">
				<Text color="blue.light" fontSize={16} pb={1} bold>
					R$
				</Text>
				<Text color="blue.light" fontSize={28} bold>
					{formatNumber(props.price)}
				</Text>
			</View>
			<ContactButton>
				<HStack space={2}>
					<FontAwesome name="whatsapp" size={24} color="white" />
					<Text color="white">Entrar em contato</Text>
				</HStack>
			</ContactButton>
		</FooterBuy>
	) : (
		<FooterMyAd>
			<InativeButton onPress={handleDisableAd} isLoading={isLoading}>
				<Text color="white" bold>
					Desativar anúncio
				</Text>
			</InativeButton>
			<DeleteButton onPress={handleDeleteAd} isLoading={isLoading}>
				<Text color="white">Excluir anúncio</Text>
			</DeleteButton>
		</FooterMyAd>
	);
}
