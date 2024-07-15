import { ReactElement, ReactNode, cloneElement, useState } from 'react';
import { IImageProps, useToast, IButtonProps, Icon } from 'native-base';
import GenerateUUID from 'react-native-uuid';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { IPhotoFile } from 'src/interfaces';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { EmptyBox } from './styles';

interface IFilePickerProps {
	onChange: (photoFile: IPhotoFile) => void;
	loadingComponent: ReactNode;
	imageComponent: ReactElement<IImageProps>;
	sizeLimitFileInMb?: number;
	editButtonComponent?: ReactElement<IButtonProps>;
	emptyImageComponent?: ReactNode;
	uri?: string;
}

export function FilePicker({
	sizeLimitFileInMb = 3,
	...props
}: IFilePickerProps) {
	const toast = useToast();
	const { v4: uuid } = GenerateUUID;
	const [uriImage] = useState(props.uri);
	const [photoIsLoading, setPhotoIsLoading] = useState(false);

	async function handleUserPhotoSelect() {
		setPhotoIsLoading(true);

		try {
			const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
				aspect: [4, 4],
				allowsEditing: true,
			});

			if (!selectedPhoto.canceled) {
				const asset = selectedPhoto.assets[0];
				const photoInfo = await FileSystem.getInfoAsync(asset.uri);

				if (photoInfo.size && photoInfo.size / 1024 / 1024 > sizeLimitFileInMb)
					return toast.show({
						title: 'Essa imagem é muito grande, o limite é de 3mb.',
						placement: 'top',
						bgColor: 'red.500',
					});

				const fileExtension = asset.uri.split('.').pop();
				const photoFile = {
					name: `${uuid().toString()}.${fileExtension}`.toLowerCase(),
					uri: asset.uri,
					type: `${asset.type}/${fileExtension}`,
				};

				props.onChange(photoFile);
			}
		} catch (error) {
			console.log(error);
			toast.show({
				title: 'Ocorreu um erro ao tentar escolher o arquivo',
				placement: 'top',
				bgColor: 'red.500',
			});
		} finally {
			setPhotoIsLoading(false);
		}
	}

	return (
		<>
			{photoIsLoading ? (
				props.loadingComponent
			) : (
				<TouchableOpacity
					onPress={
						props.editButtonComponent ? undefined : handleUserPhotoSelect
					}
				>
					{uriImage
						? cloneElement(props.imageComponent, {
								source: { uri: uriImage },
						  })
						: props.emptyImageComponent ?? (
								<EmptyBox>
									<Icon as={AntDesign} name="plus" size={6} color="gray.400" />
								</EmptyBox>
						  )}
				</TouchableOpacity>
			)}
			{props.editButtonComponent &&
				cloneElement(props.editButtonComponent, {
					onPress: handleUserPhotoSelect,
				})}
		</>
	);
}
