import React, { useRef } from 'react';
import { Dimensions } from 'react-native';
import { View } from 'native-base';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { IPhotoFile } from 'src/interfaces';
import { ImageItem, PaginationItem } from './styles';

const width = Dimensions.get('window').width;

interface IImageContainerProps {
	photos: IPhotoFile[];
}

export function ImageContainer({ photos }: IImageContainerProps) {
	const ref = useRef<ICarouselInstance>(null);
	const progress = useSharedValue<number>(0);
	const data = [...new Array(photos.length).keys()];

	function onPressPagination(index: number) {
		ref.current?.scrollTo({
			/**
			 * Calculate the difference between the current index and the target index
			 * to ensure that the carousel scrolls to the nearest index
			 */
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
					<ImageItem
						alt={`imagem ${index} do anúncio`}
						source={{ uri: photos[index].uri }}
					/>
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
