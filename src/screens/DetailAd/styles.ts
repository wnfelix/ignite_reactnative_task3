import styled from 'styled-components/native';
import { Chip } from '@components/Chip';

export const ChipItem = styled(Chip).attrs(() => ({
	mr: 'auto',
	bg: 'gray.500',
	color: 'black',
	borderWidth: 0,
	bold: true,
}))``;
