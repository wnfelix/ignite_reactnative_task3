import { Button } from '@components/Button';
import styled from 'styled-components/native';
import { Text } from 'native-base';

export const TextButton = styled(Text).attrs(() => ({
	bold: true,
	letterSpacing: 'xl',
}))``;

export const ClearButton = styled(Button)`
	width: 45%;
	border-radius: 8px;
`;

export const ApplyButton = styled(Button).attrs(() => ({
	bgColor: 'black',
}))`
	width: 45%;
	border-radius: 8px;
`;
