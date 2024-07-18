import React from 'react';
import { Container, AdItemImage, Header, AvatarImage } from './styles';
import { Text } from 'native-base';
import { formatCurrency } from '@utils/numberUtils';
import { api } from '@services/api';
import { useAuth } from '@hooks/useAuth';
import { AdItemChip } from '@components/AdItemChip';

interface IAdItemProps {
	title: string;
	price: number;
	used: boolean;
}

export function AdItem({ title, price, used }: IAdItemProps) {
	const { user } = useAuth();

	return (
		<Container>
			<AdItemImage
				source={{ uri: `${api.defaults.baseURL}images/${user.avatar}` }}
				alt={title}
			/>
			<Header>
				<AvatarImage
					source={{ uri: `${api.defaults.baseURL}images/${user.avatar}` }}
					alt="avatar"
				/>
				<AdItemChip used={used} />
			</Header>
			<Text>{title}</Text>
			<Text bold>{formatCurrency(price)}</Text>
		</Container>
	);
}
