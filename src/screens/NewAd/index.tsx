import { cloneElement, useEffect, useState } from 'react';
import {
	Checkbox,
	FormControl,
	HStack,
	Radio,
	Switch,
	Text,
} from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppStackNavigatorRoutesProps } from '@routes/app.routes';
import { paymentMethods } from 'src/constants';
import { Container, ScrollView } from '@styles/global';
import { IInputProps, Input } from '@components/Input';
import { FilePicker } from '@components/FilePicker';
import { Loading } from '@components/Loading';
import { getNewId } from '@utils/utils';
import {
	IPaymentMethod,
	IPhotoFile,
	IProduct,
	PaymentMethodType,
} from 'src/interfaces';
import {
	Footer,
	Header,
	Main,
	Title,
	ImageLoading,
	ProductSection,
	CancelButton,
	NextButton,
} from './styles';
import { ImageItem } from './components/ImageItem';
import { BackIconButton } from '@components/BackIconButton';
import productService from '@services/productService';
import { formatNumber } from '@utils/numberUtils';
import { parseNumber } from '@utils/stringUtils';

interface IFormDataProps
	extends Omit<IProduct, 'id' | 'product_images' | 'user' | 'price'> {
	price: string;
}

const LIMIT_PHOTOS = 3;

const emptyImage = {
	name: getNewId(),
	type: 'image/jpeg',
	uri: '',
};

const signUpSchema = yup.object({
	name: yup.string().required('Informe o nome do produto'),
	description: yup.string().required('Informe a descrição do produto'),
	price: yup
		.string()
		.required('Informe o preço')
		.matches(
			/^\d+([,]\d{1,2})?$/,
			'O preço deve ser um número válido com até duas casas decimais'
		),
	is_new: yup.bool().default(true),
	accept_trade: yup.bool().default(true),
	payment_methods: yup
		.array()
		.of(yup.mixed<IPaymentMethod>().required())
		.min(1, 'Selecione pelo menos um método de pagamento')
		.required('Informe os métodos de pagamento'),
});

type RouteParamsProps = {
	id: string;
};

export function NewAd() {
	const navigation = useNavigation<AppStackNavigatorRoutesProps>();
	const [images, setImages] = useState<IPhotoFile[]>([emptyImage]);
	const [id, setId] = useState<string>();
	const [isLoading, setIsLoading] = useState(true);
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<IFormDataProps>({
		resolver: yupResolver(signUpSchema),
		defaultValues: {
			payment_methods: [],
		},
	});

	const route = useRoute();
	const params = route.params as RouteParamsProps;

	useEffect(() => {
		fetchProduct();
		setId(params?.id);
	}, []);

	async function fetchProduct() {
		if (params?.id) {
			const product = await productService.getOne(params.id);
			setValue('name', product.name);
			setValue('description', product.description);
			setValue('is_new', product.is_new);
			setValue('price', formatNumber(product.price));
			setValue('accept_trade', product.accept_trade);
			setValue('payment_methods', product.payment_methods);

			const images = product.product_images.map(
				i =>
					({
						name: i.id,
						uri: productService.getPhotoUri(i.path),
						type: emptyImage.type,
					} as IPhotoFile)
			);

			setImages(prevImages => {
				prevImages.splice(0, prevImages.length);

				for (let index = 0; index < LIMIT_PHOTOS; index++) {
					if (images.length > index) {
						prevImages.push(images[index]);
					} else if (images.length === index) {
						prevImages.push(emptyImage);
					}
				}

				return prevImages;
			});
		}
		setIsLoading(false);
	}

	/**
	 * Generate HookForm Controller
	 * @param fieldName internal name field
	 * @param placeHolder label display on field
	 * @param FieldControl input control
	 * @param errorMessage message error if exists
	 * @returns HookForm Controller
	 */
	function formField(
		fieldName: keyof IFormDataProps,
		placeHolder: string,
		FieldControl: React.ReactElement<IInputProps>,
		errorMessage: string | undefined
	) {
		return (
			<Controller
				control={control}
				name={fieldName}
				render={({ field: { onChange, value } }) =>
					cloneElement(FieldControl, {
						placeholder: placeHolder,
						onChangeText: onChange,
						value: value?.toString(),
						errorMessage: errorMessage,
						bgColor: 'white',
					})
				}
			/>
		);
	}

	//#region handlers

	function handleCheckboxChange(value: PaymentMethodType) {
		const method = paymentMethods.find(
			item => item.key === value
		) as IPaymentMethod;
		const currentValue = getValues('payment_methods');
		const newValue =
			currentValue.findIndex(item => item.key === method.key) >= 0
				? currentValue.filter(value => value.key !== method.key)
				: [...currentValue, method];

		setValue('payment_methods', newValue, { shouldValidate: true });
	}

	function handleCreateAdd(data: IFormDataProps) {
		navigation.navigate('previewAd', {
			...data,
			price: parseNumber(data.price),
			id: id ?? '',
			product_images: images.filter(i => i.uri.length > 0),
		});
	}

	function handleOnChangeImage(index: number, image: IPhotoFile) {
		setImages(prevImages => {
			const updatedImages = [...prevImages];
			updatedImages[index] = image;

			if (
				(index === 0 && updatedImages.length === 1) ||
				(index + 1 > 1 && updatedImages.length < LIMIT_PHOTOS)
			) {
				updatedImages.push(emptyImage);
			}

			return updatedImages;
		});
	}

	function handleOnCloseImageItem(index: number) {
		setImages(prevState => {
			const newState = prevState.filter((_i, idx) => idx !== index);

			if (newState.findIndex(i => i.name === emptyImage.name) === -1) {
				newState.push(emptyImage);
			}

			return newState;
		});
	}
	//#endregion

	return (
		<Container>
			<Header>
				<BackIconButton />
				<Title>Criar anúncio</Title>
			</Header>
			<ScrollView>
				<Main>
					{isLoading ? (
						<Loading />
					) : (
						<>
							<Text bold fontSize="md">
								Imagens
							</Text>
							<Text>
								Escolha até 3 imagens para mostrar o quanto seu produto é
								incrível
							</Text>
							<HStack mt={3} space={2}>
								{images.map((image, index) => (
									<FilePicker
										key={image.name}
										uri={image.uri === '' ? undefined : image.uri}
										imageComponent={
											<ImageItem
												alt={`foto ${index} do novo anúncio`}
												onClose={() => handleOnCloseImageItem(index)}
											/>
										}
										loadingComponent={
											<ImageLoading>
												<Loading />
											</ImageLoading>
										}
										onChange={f => handleOnChangeImage(index, f)}
									/>
								))}
							</HStack>

							<ProductSection>
								<Text bold fontSize="md">
									Sobre o produto
								</Text>
								{formField(
									'name',
									'Título do anúncio',
									<Input maxLength={50} />,
									errors.name?.message
								)}
								{formField(
									'description',
									'Descrição do produto',
									<Input
										numberOfLines={6}
										textAlignVertical="top"
										multiline
										maxLength={2000}
									/>,
									errors.description?.message
								)}
								<Controller
									control={control}
									name="is_new"
									render={({ field: { onChange, value } }) => (
										<Radio.Group
											name="state"
											value={String(value ?? 'true')}
											onChange={onChange}
										>
											<HStack space={6}>
												<Radio value="true">Produto novo</Radio>
												<Radio value="false">Produto usado</Radio>
											</HStack>
										</Radio.Group>
									)}
								/>
								<Text bold>Venda</Text>
								{formField(
									'price',
									'Valor do produto',
									<Input
										placeholder="Valor do produto"
										fontSize="md"
										maxLength={12}
										keyboardType="decimal-pad"
										InputLeftElement={
											<Text pl={4} fontSize="md">
												R$
											</Text>
										}
									/>,
									errors.price?.message
								)}
								<Text bold>Aceita troca?</Text>
								<Controller
									control={control}
									name="accept_trade"
									render={({ field: { onChange, value } }) => (
										<Switch
											size="lg"
											width={10}
											height={8}
											isChecked={value ?? true}
											onToggle={onChange}
										/>
									)}
								/>
								<Text bold>Meios de pagamento aceitos</Text>
								<FormControl isInvalid={!!errors.payment_methods?.message}>
									{paymentMethods.map(({ key, name }) => (
										<Controller
											key={key}
											name="payment_methods"
											control={control}
											render={({ field: { value } }) => (
												<Checkbox
													size="sm"
													value={key}
													isChecked={
														value.findIndex(item => item.key === key) >= 0
													}
													onChange={() => handleCheckboxChange(key)}
												>
													{name}
												</Checkbox>
											)}
										/>
									))}
									<FormControl.ErrorMessage _text={{ color: 'red.500' }}>
										{errors.payment_methods?.message}
									</FormControl.ErrorMessage>
								</FormControl>
							</ProductSection>
						</>
					)}
				</Main>
				<Footer>
					<CancelButton onPress={() => navigation.goBack()}>
						<Text color="black" bold>
							Cancelar
						</Text>
					</CancelButton>
					<NextButton onPress={handleSubmit(handleCreateAdd)}>
						<Text color="white">Avançar</Text>
					</NextButton>
				</Footer>
			</ScrollView>
		</Container>
	);
}
