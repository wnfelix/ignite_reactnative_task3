import { Button } from '@components/Button';
import { HStack } from 'native-base';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

export const Container = styled(HStack).attrs(() => ({
	space: 2,
}))``;

export const AddButton = styled(Button).attrs(() => ({
	ml: 'auto',
	w: 32,
	backgroundColor: 'black',
	h: 10,
}))``;

export const AddIcon = styled(AntDesign).attrs(() => ({
	size: 16,
	color: 'white',
}))``;
