import { cloneElement, useState } from 'react';
import {
	Checkbox,
	FormControl,
	HStack,
	Icon,
	Radio,
	Switch,
	Text,
	VStack,
} from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigatorRoutesProps } from '@routes/app.routes';
import { AntDesign } from '@expo/vector-icons';
import { paymentMethods } from 'src/constants';
import { Container, ScrollView } from '@styles/global';
import { IInputProps, Input } from '@components/Input';
import { Button } from '@components/Button';
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
	BackIcon,
	ProductSection,
	CancelButton,
	NextButton,
} from './styles';
import { ImageItem } from './components/ImageItem';

interface IFormDataProps
	extends Omit<IProduct, 'id' | 'product_images' | 'user'> {}

const emptyImage = {
	name: getNewId(),
	type: 'image/jpeg',
	uri: '',
};

const signUpSchema = yup.object({
	name: yup.string().required('Informe o nome do produto'),
	description: yup.string().required('Informe a descrição do produto'),
	price: yup.number().required('Informe o preço').moreThan(0.99),
	is_new: yup.bool().default(true),
	accept_trade: yup.bool().default(true),
	payment_methods: yup
		.array()
		.of(yup.mixed<IPaymentMethod>().required())
		.min(1, 'Selecione pelo menos um método de pagamento')
		.required('Informe os métodos de pagamento'),
});

export function NewAd() {
	const navigation = useNavigation<AppStackNavigatorRoutesProps>();
	const [images, setImages] = useState<IPhotoFile[]>([emptyImage]);
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
			photos: images.filter(i => i.uri.length > 0),
		});
	}

	function handleOnChangeImage(index: number, image: IPhotoFile) {
		const LIMIT_PHOTOS = 3;

		setImages(prevImages => {
			const updatedImages = [...prevImages];
			updatedImages[index] = image;

			if (
				(index + 1 === 1 && updatedImages.length === 1) ||
				(index + 1 > 1 && updatedImages.length < LIMIT_PHOTOS)
			) {
				updatedImages.push(emptyImage);
			}

			return updatedImages;
		});
	}

	return (
		<Container>
			<Header>
				<BackIcon
					as={AntDesign}
					name="arrowleft"
					onPress={() => navigation.goBack()}
				/>
				<Title>Criar anúncio</Title>
			</Header>
			<ScrollView>
				<Main>
					<Text bold fontSize="md">
						Imagens
					</Text>
					<Text>
						Escolha até 3 imagens para mostrar o quanto seu produto é incrível
					</Text>
					<HStack mt={3} space={2}>
						{images.map((image, index) => (
							<FilePicker
								key={image.name}
								uri={image.uri === '' ? undefined : image.uri}
								imageComponent={
									<ImageItem
										alt={`foto ${index} do novo anúncio`}
										onClose={() => console.log(image.name)}
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
							<Input />,
							errors.name?.message
						)}
						{formField(
							'description',
							'Descrição do produto',
							<Input numberOfLines={6} textAlignVertical="top" multiline />,
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
											isChecked={value.findIndex(item => item.key === key) >= 0}
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
