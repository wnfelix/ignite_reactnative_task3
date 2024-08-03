import { useState } from 'react';
import { Image, IImageProps, useToast, Skeleton } from 'native-base';
import GenerateUUID from 'react-native-uuid';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Avatar from '@assets/Avatar.png';
import { AvatarEditButton } from './styles';
import { IPhotoFile } from 'src/interfaces';

interface IUserPhotoProps extends IImageProps {
	onChange: (photoFile: IPhotoFile) => void;
}

export function AvatarPhoto(props: IUserPhotoProps) {
	const sizeLimitFileInMb = 3;
	const toast = useToast();
	const { v4: uuid } = GenerateUUID;
	const [uriAvatar, setUriAvatar] = useState<string>();
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

				setUriAvatar(photoFile.uri);
				props.onChange(photoFile);
			}
		} catch (error) {
			console.log(error);
			toast.show({
				title: 'Ocorreu um erro ao tentar atualizar a foto',
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
				<Skeleton
					w={24}
					h={24}
					rounded="full"
					startColor="gray.400"
					endColor="gray.300"
				/>
			) : (
				<Image
					source={uriAvatar ? { uri: uriAvatar } : Avatar}
					alt="avatar"
					w={24}
					h={24}
					rounded="full"
					borderWidth={2}
					borderColor="blue.normal"
				/>
			)}
			<AvatarEditButton
				icon={<FontAwesome6 name="pencil" size={10} color="white" />}
				onPress={handleUserPhotoSelect}
			/>
		</>
	);
}
