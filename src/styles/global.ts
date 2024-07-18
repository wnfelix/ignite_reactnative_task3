import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView as NativeBaseScrollView } from 'native-base';

export const Container = styled(SafeAreaView)`
	flex: 1;
`;

export const ScrollView = styled(NativeBaseScrollView).attrs(() => ({
	contentContainerStyle: { flexGrow: 1 },
	showsVerticalScrollIndicator: false,
}))``;
