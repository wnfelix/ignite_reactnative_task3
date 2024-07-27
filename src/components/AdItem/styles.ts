import { HStack, Image, VStack, View } from 'native-base';
import styled from 'styled-components/native';

export const Container = styled(VStack).attrs(() => ({
	mr: 4,
	mb: 4,
	w: 40,
}))`
	/* width: 150px; */
`;

export const AdItemImage = styled(Image).attrs(() => ({
	h: 32,
	borderRadius: 8,
}))``;

interface IHeaderProps {
	active: boolean;
}
export const Header = styled(HStack).attrs<IHeaderProps>(({ active }) => ({
	position: 'absolute',
	w: 'full',
	p: 1,
	justifyContent: 'space-between',
	opacity: active ? 1 : 0.6,
}))``;

export const AvatarImage = styled(Image).attrs(() => ({
	h: 8,
	w: 8,
	borderRadius: 'full',
	borderColor: 'white',
	borderWidth: 1,
}))``;

export const Overlay = styled(View).attrs(() => ({
	borderRadius: 8,
}))`
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
`;
