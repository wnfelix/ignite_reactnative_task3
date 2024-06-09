import {
	Input as NativeBaseInput,
	FormControl,
	IInputProps as IInputPropsNativeBase,
} from "native-base";

export interface IInputProps extends IInputPropsNativeBase {
	errorMessage?: string;
}

export function Input({ errorMessage, isInvalid, ...props }: IInputProps) {
	const invalid = !!errorMessage || isInvalid;

	return (
		<FormControl isInvalid={invalid}>
			<NativeBaseInput
				{...props}
				isInvalid={invalid}
				_invalid={{
					borderWidth: 1,
					borderColor: "red.500",
				}}
			></NativeBaseInput>
			<FormControl.ErrorMessage _text={{ color: "red.500" }}>
				{errorMessage}
			</FormControl.ErrorMessage>
		</FormControl>
	);
}
