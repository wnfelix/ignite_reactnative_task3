import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Pagination } from 'react-native-reanimated-carousel';
import { Image } from 'native-base';

const width = Dimensions.get('window').width;

export const ImageItem = styled(Image)`
	flex: 1;
	justify-content: center;
`;

export const Overlay = styled.View`
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
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
