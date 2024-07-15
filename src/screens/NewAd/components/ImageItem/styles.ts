import { Box, Image as NativeImage } from 'native-base';
import styled from 'styled-components/native';

const defaultSize = 24;

export const Container = styled(Box).attrs(() => ({
	w: defaultSize,
	h: defaultSize,
}))``;

export const Image = styled(NativeImage).attrs(() => ({
	w: defaultSize,
	h: defaultSize,
	background: 'gray.400',
	borderRadius: 5,
}))``;
