import styled from 'styled-components/native';
import { Button } from '@components/Button';
import { Text } from 'native-base';

export const TextButton = styled(Text).attrs(() => ({
	bold: true,
	letterSpacing: 'xl',
}))``;

export const ClearButton = styled(Button)`
	flex: 1;
	border-radius: 8px;
`;

export const ApplyButton = styled(Button).attrs(() => ({
	bgColor: 'black',
}))`
	flex: 1;
	border-radius: 8px;
`;
