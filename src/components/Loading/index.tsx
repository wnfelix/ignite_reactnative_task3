import { Spinner, Center, ISpinnerProps } from 'native-base';

interface ILoadingProps extends ISpinnerProps {}
export function Loading({ color = 'blue.normal', size = 'sm' }: ILoadingProps) {
	return (
		<Center flex={1} bg={'gray.700'}>
			<Spinner color={color} size={size} />
		</Center>
	);
}
