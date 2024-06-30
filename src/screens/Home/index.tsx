import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
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
import { useAuth } from '@hooks/useAuth';
import { Input } from '@components/Input';
import { AdItem } from '@components/AdItem';
import { Header } from './components/Header';
import { ActiveAddsSection, Container, Main, MyAddsLink } from './styles';
import { IProduct } from 'src/interfaces';
import { Filter } from './components/Filter';

export function Home() {
	const { user } = useAuth();
	const [products, setProducts] = useState<IProduct[]>([
		{
			id: '1',
			name: 'Calça branca',
			price: 150.5,
			is_new: false,
			description: '',
			accept_trade: true,
			payment_methods: [{ key: '', name: '' }],
			product_images: [{ id: '', path: '' }],
			user: { avatar: '' },
		},
		{
			id: '2',
			name: 'Blusa Vermelha',
			price: 120,
			is_new: true,
			description: '',
			accept_trade: true,
			payment_methods: [{ key: '', name: '' }],
			product_images: [{ id: '', path: '' }],
			user: { avatar: '' },
		},
		{
			id: '3',
			name: 'Regata',
			price: 50.984,
			is_new: true,
			description: '',
			accept_trade: true,
			payment_methods: [{ key: '', name: '' }],
			product_images: [{ id: '', path: '' }],
			user: { avatar: '' },
		},
		{
			id: '4',
			name: 'Moletom',
			price: 50.984,
			is_new: false,
			description: '',
			accept_trade: true,
			payment_methods: [{ key: '', name: '' }],
			product_images: [{ id: '', path: '' }],
			user: { avatar: '' },
		},
		{
			id: '5',
			name: 'Terno Armani',
			price: 50.984,
			is_new: true,
			description: '',
			accept_trade: true,
			payment_methods: [{ key: '', name: '' }],
			product_images: [{ id: '', path: '' }],
			user: { avatar: '' },
		},
	]);

	const [showFilter, setShowFilter] = useState(false);
	return (
		<>
			<Container>
				<Header />
				<Main>
					<Text mt={3}>Seus produtos anunciados para venda</Text>
					<ActiveAddsSection>
						<Icon as={Feather} name="tag" size={6} color="blue.normal" />
						<VStack>
							<Heading>4</Heading>
							<Text>anúncios ativos</Text>
						</VStack>
						<MyAddsLink>
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
						data={products}
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<AdItem
								price={item.price}
								title={item.name}
								used={!item.is_new}
							/>
						)}
						numColumns={2}
						showsVerticalScrollIndicator={false}
						_contentContainerStyle={{ paddingBottom: 4 }}
						ItemSeparatorComponent={() => (
							<View style={{ width: 20, height: 20, borderWidth: 1 }} />
						)}
					/>
				</Main>
			</Container>
			<Filter show={showFilter} onClose={() => setShowFilter(false)} />
		</>
	);
}
