import { Chip } from '@components/Chip';
import { HStack, Image, VStack } from 'native-base';
import styled from 'styled-components/native';

export const Container = styled(VStack).attrs(() => ({
	mb: 4,
}))`
	width: 150px;
`;

export const AdItemImage = styled(Image).attrs(() => ({
	h: 32,
	borderRadius: 8,
}))``;

export const Header = styled(HStack).attrs(() => ({
	position: 'absolute',
	p: 1,
	justifyContent: 'space-between',
	w: 'full',
}))``;

export const AvatarImage = styled(Image).attrs(() => ({
	h: 8,
	w: 8,
	borderRadius: 'full',
	borderColor: 'white',
	borderWidth: 1,
}))``;

interface IAdItemChipProps {
	used: boolean;
}
export const AdItemChip = styled(Chip).attrs<IAdItemChipProps>(({ used }) => ({
	bg: used ? 'gray.200' : 'primary.600',
}))``;
