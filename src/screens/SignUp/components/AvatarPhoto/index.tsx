import { useState } from 'react';
import { Image, IImageProps, useToast, Skeleton } from 'native-base';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Avatar from '@assets/Avatar.png';
import { AvatarEditButton } from './styles';
import { IPhotoFile } from 'src/interfaces';
import { getDeviceImage, tryCatch } from '@utils/utils';

interface IUserPhotoProps extends IImageProps {
	onChange: (photoFile: IPhotoFile) => void;
}

export function AvatarPhoto(props: IUserPhotoProps) {
	const toast = useToast();
	const [uriAvatar, setUriAvatar] = useState<string>();
	const [photoIsLoading, setPhotoIsLoading] = useState(false);

	async function handleUserPhotoSelect() {
		setPhotoIsLoading(true);

		tryCatch({
			tryMethod: async () => {
				const photoFile = await getDeviceImage();
				if (photoFile) {
					setUriAvatar(photoFile.uri);
					props.onChange(photoFile);
				}
			},
			finallyMethod: () => {
				setPhotoIsLoading(false);
			},
			errorMessage: 'Ocorreu um erro ao tentar escolher o arquivo',
			toast: toast,
		});
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
