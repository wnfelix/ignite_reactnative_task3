import GenerateUUID from 'react-native-uuid';
import { AppError } from './AppError';
import { IToastProps } from 'native-base';

interface ITryCatchParams {
	tryMethod: () => Promise<void>;
	finallyMethod?: () => void;
	successMessage?: string;
	errorMessage?: string;
	toast?: {
		show: (props: IToastProps) => any;
	};
}

export function getNewId() {
	return GenerateUUID.v4().toString();
}

export async function tryCatch(params: ITryCatchParams) {
	const { errorMessage, tryMethod, finallyMethod, successMessage, toast } =
		params;

	try {
		await tryMethod();

		if (successMessage)
			toast?.show({
				title: successMessage,
				placement: 'top',
				bgColor: 'green.500',
			});
	} catch (error) {
		handleError(error, errorMessage, toast);
	} finally {
		finallyMethod?.();
	}
}

export function handleError(
	error: unknown,
	errorMessage?: string,
	toast?: { show: (props: IToastProps) => any }
) {
	console.log(error);
	if (errorMessage) {
		const isAppError = error instanceof AppError;
		const title = isAppError ? error.message : errorMessage;

		toast?.show({
			title: title,
			placement: 'top',
			bgColor: 'red.500',
		});
	}
}

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { IPhotoFile } from 'src/interfaces';

export async function getDeviceImage(
	sizeLimitFileInMb: number = 3
): Promise<IPhotoFile | undefined> {
	return new Promise(async (resolve, reject) => {
		const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1,
			aspect: [4, 4],
			allowsEditing: true,
		});

		if (!selectedPhoto.canceled) {
			const asset = selectedPhoto.assets[0];
			const photoInfo = await FileSystem.getInfoAsync(asset.uri);

			if (photoInfo.size && photoInfo.size / 1024 / 1024 > sizeLimitFileInMb) {
				reject(new AppError('Essa imagem é muito grande, o limite é de 3mb.'));
				return;
			}

			const fileExtension = asset.uri.split('.').pop();
			const photoFile: IPhotoFile = {
				name: `${getNewId().toString()}.${fileExtension}`.toLowerCase(),
				uri: asset.uri,
				type: `${asset.type}/${fileExtension}`,
			};

			resolve(photoFile);
		} else {
			resolve(undefined);
		}
	});
}
