import { ReactElement, ReactNode, cloneElement, useState } from 'react';
import { IImageProps, useToast, IButtonProps, Icon } from 'native-base';
import { IPhotoFile } from 'src/interfaces';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { EmptyBox } from './styles';
import { getDeviceImage, tryCatch } from '@utils/utils';

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
	const [uriImage] = useState(props.uri);
	const [photoIsLoading, setPhotoIsLoading] = useState(false);

	async function handleUserPhotoSelect() {
		setPhotoIsLoading(true);

		tryCatch({
			tryMethod: async () => {
				const photoFile = await getDeviceImage();
				if (photoFile) {
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
