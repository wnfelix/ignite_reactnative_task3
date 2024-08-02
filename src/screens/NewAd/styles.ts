import styled from 'styled-components/native';
import { HStack, Heading, VStack, Box, Icon } from 'native-base';
import { Button } from '@components/Button';

export const Header = styled(HStack).attrs(() => ({
	px: 2,
	py: 2,
	pt: 5,
	alignItems: 'center',
}))``;

export const Title = styled(Heading).attrs(() => ({
	fontSize: 'lg',
	width: '3/4',
	textAlign: 'center',
}))``;

export const Main = styled(VStack).attrs(() => ({
	padding: 5,
	flex: 1,
}))``;

export const ImageLoading = styled(Box).attrs(() => ({
	height: 24,
	width: 24,
	borderRadius: 5,
	bgColor: 'gray.700',
	justifyContent: 'center',
	alignItems: 'center',
}))``;

export const ProductSection = styled(VStack).attrs(() => ({
	mt: 4,
	space: 3,
}))``;

export const Footer = styled(HStack).attrs(() => ({
	mt: 12,
	justifyContent: 'space-around',
	bgColor: 'white',
	p: 4,
	width: 'full',
	space: 4,
}))``;

export const CancelButton = styled(Button).attrs(() => ({
	borderRadius: 6,
	flex: 1,
}))``;

export const NextButton = styled(Button).attrs(() => ({
	borderRadius: 6,
	flex: 1,
	bgColor: 'black',
}))``;
