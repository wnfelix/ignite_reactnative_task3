import { Button } from '@components/Button';
import { HStack, VStack } from 'native-base';
import styled from 'styled-components/native';

export const FooterBuy = styled(HStack).attrs(() => ({
	mt: 12,
	justifyContent: 'space-around',
	bgColor: 'white',
	p: 4,
	width: 'full',
	space: 4,
}))``;

export const FooterMyAd = styled(VStack).attrs(() => ({
	p: 4,
	space: 2,
}))``;

export const ContactButton = styled(Button).attrs(() => ({
	borderRadius: 6,
	flex: 1,
	bgColor: 'blue.light',
}))``;
