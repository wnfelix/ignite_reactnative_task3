import { Box } from 'native-base';
import styled from 'styled-components/native';

export const EmptyBox = styled(Box).attrs(() => ({
	height: 24,
	width: 24,
	borderRadius: 5,
	bgColor: 'gray.500',
	justifyContent: 'center',
	alignItems: 'center',
}))``;
