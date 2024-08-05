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
	useToast,
} from 'native-base';
import { Feather, AntDesign, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { Input } from '@components/Input';
import { AdItem } from '@components/AdItem';
import { Header } from './components/Header';
import { ActiveAddsSection, Container, Main, MyAddsLink } from './styles';
import { IProduct } from 'src/interfaces';
import { Filter } from './components/Filter';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import productService, { IGetAllParams } from '@services/productService';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import userService from '@services/userService';
import { tryCatch } from '@utils/utils';
import { Loading } from '@components/Loading';

export function Home() {
	const navigator = useNavigation<AppNavigatorRoutesProps>();
	const toast = useToast();
	const [ads, setAds] = useState<IProduct[]>([]);
	const [activeCount, setActiveCount] = useState(0);
	const [showFilter, setShowFilter] = useState(false);
	const [textFilter, setTextFilter] = useState<string | undefined>();
	const [filters, setFilters] = useState<IGetAllParams>();
	const [isLoading, setIsLoading] = useState(true);

	useFocusEffect(
		useCallback(() => {
			fetchProducts();
		}, [filters])
	);

	async function fetchProducts() {
		setIsLoading(true);
		tryCatch({
			tryMethod: async () => {
				const data = await productService.getAll(filters);
				setAds(data);

				const myProducts = await userService.getMyProducts();
				setActiveCount(myProducts.filter(i => i.is_active).length);
			},
			finallyMethod: () => {
				setIsLoading(false);
			},
		});
	}

	function handleSearchButton() {
		setFilters(prevState => ({
			...prevState,
			query: textFilter ? textFilter : undefined,
		}));
	}

	function handleApplyFilters(value?: IGetAllParams) {
		setFilters({
			...value,
			query: textFilter ? textFilter : undefined,
		});
	}

	function handleResetFilters() {
		setFilters(undefined);
		setTextFilter(undefined);
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
							<Heading>{activeCount}</Heading>
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
					{isLoading ? (
						<Loading size="lg" />
					) : (
						<>
							<Text mt={3}>Compre produtos variados</Text>
							<Input
								placeholder="Buscar anúncio"
								maxLength={50}
								value={textFilter}
								onChangeText={setTextFilter}
								returnKeyType="search"
								onSubmitEditing={handleSearchButton}
								InputRightElement={
									<HStack h={8} alignItems="center" mx={3}>
										<TouchableOpacity onPress={handleSearchButton}>
											<Icon
												as={FontAwesome6}
												name="magnifying-glass"
												size={5}
												color="black"
											/>
										</TouchableOpacity>
										<Divider orientation="vertical" mx={3} />
										<TouchableOpacity onPress={() => setShowFilter(true)}>
											<Icon
												as={Ionicons}
												name="options"
												size={5}
												color="black"
											/>
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
								columnWrapperStyle={{ justifyContent: 'space-between' }}
								_contentContainerStyle={{ paddingBottom: 4 }}
							/>
						</>
					)}
				</Main>
			</Container>
			<Filter
				show={showFilter}
				onClose={() => setShowFilter(false)}
				onReset={handleResetFilters}
				onChange={handleApplyFilters}
			/>
		</>
	);
}
