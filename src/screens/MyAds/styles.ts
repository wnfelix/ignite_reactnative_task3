import styled from 'styled-components/native';
import { VStack } from 'native-base';
import { Container as GlobalContainer } from '@styles/global';

export const Main = styled(VStack).attrs(() => ({
	mt: 6,
	space: 3,
	flex: 1,
}))``;

export const Container = styled(GlobalContainer)`
	padding: 20px;
`;
