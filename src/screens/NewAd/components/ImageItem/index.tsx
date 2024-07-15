import React from 'react';
import { Icon, IImageProps } from 'native-base';
import { Container, Image } from './styles';
import { AntDesign } from '@expo/vector-icons';

interface IImageItemProps extends IImageProps {
	onClose: () => void;
}

export function ImageItem({ onClose, ...props }: IImageItemProps) {
	return (
		<Container>
			<Image {...props} />
			<Icon
				as={AntDesign}
				name="closecircle"
				position="absolute"
				alignSelf="flex-end"
				right={1}
				top={1}
				color="black"
				size="sm"
				onPress={onClose}
			/>
		</Container>
	);
}
