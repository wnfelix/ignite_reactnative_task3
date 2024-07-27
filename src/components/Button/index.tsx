import {
	Button as NativeBaseButton,
	IButtonProps as INativeBaseButtonProps,
} from 'native-base';

export interface IButtonProps extends INativeBaseButtonProps {}

export function Button(props: IButtonProps) {
	return (
		<NativeBaseButton
			bgColor="gray.500"
			_pressed={{
				backgroundColor: 'gray.400',
			}}
			{...props}
		></NativeBaseButton>
	);
}
