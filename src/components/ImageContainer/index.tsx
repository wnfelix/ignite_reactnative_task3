import React, { useRef } from 'react';
import { Dimensions } from 'react-native';
import { View, Text } from 'native-base';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { IPhotoFile } from 'src/interfaces';
import { ImageItem, Overlay, PaginationItem } from './styles';

const width = Dimensions.get('window').width;

interface IInativeImage {
	disabled?: boolean;
	title?: string;
}

interface IImageContainerProps {
	photos: (IPhotoFile & IInativeImage)[];
}

export function ImageContainer({ photos }: IImageContainerProps) {
	const ref = useRef<ICarouselInstance>(null);
	const progress = useSharedValue<number>(0);
	const data = [...new Array(photos.length).keys()];

	function onPressPagination(index: number) {
		ref.current?.scrollTo({
			count: index - progress.value,
			animated: true,
		});
	}

	return (
		<View style={{ flex: 1 }}>
			<Carousel
				ref={ref}
				width={width}
				height={280}
				data={data}
				onProgressChange={progress}
				renderItem={({ index }) => (
					<>
						<ImageItem
							alt={`imagem ${index} do anúncio`}
							source={{ uri: photos[index].uri }}
						/>
						{photos[index].disabled && (
							<Overlay>
								<Text bold color="white">
									ANÚNCIO DESATIVADO
								</Text>
							</Overlay>
						)}
					</>
				)}
			/>
			<PaginationItem
				length={photos.length}
				progress={progress}
				data={data}
				onPress={onPressPagination}
			/>
		</View>
	);
}
