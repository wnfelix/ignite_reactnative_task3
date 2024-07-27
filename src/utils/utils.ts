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
