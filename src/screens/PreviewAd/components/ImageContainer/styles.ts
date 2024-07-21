import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Pagination } from 'react-native-reanimated-carousel';
import { Image } from 'native-base';

const width = Dimensions.get('window').width;

export const ImageItem = styled(Image)`
	flex: 1;
	justify-content: center;
`;

interface IPaginationItemProps {
	length: number;
}

export const PaginationItem = styled(
	Pagination.Basic
).attrs<IPaginationItemProps>(({ length }) => ({
	activeDotStyle: {
		backgroundColor: 'rgba(255,255,255,0.8)',
	},
	dotStyle: {
		backgroundColor: 'rgba(255,255,255,0.4)',
		width: (width - 5 * length) / length,
		height: 5,
		borderRadius: 5,
		top: -7,
	},
	containerStyle: {
		gap: 5,
	},
}))``;
