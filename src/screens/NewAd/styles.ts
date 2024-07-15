import {
	HStack,
	Heading,
	VStack,
	Image as NativeImage,
	Box,
} from 'native-base';
import styled from 'styled-components/native';

export const Header = styled(HStack).attrs(() => ({
	px: 5,
	py: 2,
	pt: 5,
}))``;

export const Main = styled(VStack).attrs(() => ({
	padding: 5,
	flex: 1,
}))``;

export const Footer = styled(HStack).attrs(() => ({
	mt: 12,
	justifyContent: 'space-around',
	bgColor: 'white',
	p: 4,
	width: 'full',
}))``;

export const Title = styled(Heading).attrs(() => ({
	fontSize: 'lg',
	width: '5/6',
	textAlign: 'center',
}))``;

export const ImageLoading = styled(Box).attrs(() => ({
	height: 24,
	width: 24,
	borderRadius: 5,
	bgColor: 'gray.700',
	justifyContent: 'center',
	alignItems: 'center',
}))``;
