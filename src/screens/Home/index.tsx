import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {
	HStack,
	Heading,
	Text,
	VStack,
	Icon,
	Divider,
	FlatList,
} from 'native-base';
import { Feather, AntDesign, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { Input } from '@components/Input';
import { AdItem } from '@components/AdItem';
import { Header } from './components/Header';
import { ActiveAddsSection, Container, Main, MyAddsLink } from './styles';
import { IProduct } from 'src/interfaces';
import { Filter } from './components/Filter';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import productService from '@services/productService';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function Home() {
	const navigator = useNavigation<AppNavigatorRoutesProps>();
	const [ads, setAds] = useState<IProduct[]>([]);
	const [showFilter, setShowFilter] = useState(false);

	useFocusEffect(
		useCallback(() => {
			fetchProducts();
		}, [])
	);

	async function fetchProducts() {
		const data = await productService.getAll();
		setAds(data);
	}

	return (
		<>
			<Container>
				<Header />
				<Main>
					<Text mt={3}>Seus produtos anunciados para venda</Text>
					<ActiveAddsSection>
						<Icon as={Feather} name="tag" size={6} color="blue.normal" />
						<VStack>
							<Heading>{ads.length}</Heading>
							<Text>anúncios ativos</Text>
						</VStack>
						<MyAddsLink onPress={() => navigator.navigate('myAds')}>
							<Text color="blue.normal">Meus anúncios</Text>
							<Icon
								as={AntDesign}
								name="arrowright"
								color="blue.normal"
								size={5}
							/>
						</MyAddsLink>
					</ActiveAddsSection>
					<Text mt={3}>Compre produtos variados</Text>
					<Input
						placeholder="Buscar anúncio"
						InputRightElement={
							<HStack h={8} alignItems="center" mx={3}>
								<TouchableOpacity>
									<Icon
										as={FontAwesome6}
										name="magnifying-glass"
										size={5}
										color="black"
									/>
								</TouchableOpacity>
								<Divider orientation="vertical" mx={3} />
								<TouchableOpacity onPress={() => setShowFilter(true)}>
									<Icon as={Ionicons} name="options" size={5} color="black" />
								</TouchableOpacity>
							</HStack>
						}
					/>
					<FlatList
						data={ads}
						keyExtractor={item => item.id}
						renderItem={({ item }) => <AdItem {...item} />}
						numColumns={2}
						showsVerticalScrollIndicator={false}
						_contentContainerStyle={{ paddingBottom: 4 }}
					/>
				</Main>
			</Container>
			<Filter show={showFilter} onClose={() => setShowFilter(false)} />
		</>
	);
}
