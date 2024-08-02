import React, { useCallback, useState } from 'react';
import {
	CheckIcon,
	FlatList,
	Heading,
	HStack,
	Icon,
	IconButton,
	Select,
	Text,
} from 'native-base';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppStackNavigatorRoutesProps } from '@routes/app.routes';
import { AntDesign } from '@expo/vector-icons';
import { IProduct } from 'src/interfaces';
import { AdItem } from '@components/AdItem';
import userService from '@services/userService';
import { Container, Main } from './styles';

export function MyAds() {
	const navigator = useNavigation<AppStackNavigatorRoutesProps>();
	const [myAds, setMyAds] = useState<IProduct[]>([]);
	const [isActive, setIsActive] = useState('');

	async function fetchMyAds() {
		const data = await userService.getMyProducts();
		// setMyAds(data.map(i => ({ ...i, is_active: false })));

		const filters = {
			active: isActive.length > 0 ? isActive === 'true' : undefined,
		};
		setMyAds(
			data.filter(i =>
				filters.active === undefined ? true : i.is_active === filters.active
			)
		);
	}

	useFocusEffect(
		useCallback(() => {
			fetchMyAds();
		}, [isActive])
	);

	return (
		<Container>
			<HStack alignItems="center">
				<Heading
					textAlign="center"
					marginRight="auto"
					position="relative"
					width="full"
				>
					Meus anúncios
				</Heading>
				<IconButton
					icon={<Icon as={AntDesign} name="plus" color="black" size="xl" />}
					borderRadius="full"
					onPress={() => navigator.navigate('newAd')}
				/>
			</HStack>
			<Main>
				<HStack justifyContent="space-between" alignItems="center">
					<Text>{`${myAds.length} anúncio(s)`}</Text>
					<Select
						selectedValue={isActive}
						w={32}
						h={10}
						accessibilityLabel="Choose Service"
						placeholder="Choose Service"
						_selectedItem={{
							endIcon: <CheckIcon size={5} />,
						}}
						onValueChange={setIsActive}
					>
						<Select.Item label="Todos" value="" />
						<Select.Item label="Ativos" value="true" />
						<Select.Item label="Inativos" value="false" />
					</Select>
				</HStack>
				<FlatList
					data={myAds}
					keyExtractor={item => item.id}
					renderItem={({ item }) => <AdItem {...item} showUser={false} />}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					_contentContainerStyle={{ paddingBottom: 4 }}
					columnWrapperStyle={{ justifyContent: 'space-between' }}
				/>
			</Main>
		</Container>
	);
}
