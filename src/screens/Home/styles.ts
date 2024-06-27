import styled from "styled-components/native";
import { HStack, VStack } from "native-base";
import { Container as GlobalContainer } from "@styles/global";

export const Container = styled(GlobalContainer)`
	padding: 20px;
`;

export const Main = styled(VStack).attrs(() => ({
	mt: 6,
	space: 3,
	flex: 1,
}))``;

export const MyAddsLink = styled.TouchableOpacity`
	flex-direction: row;
	margin-left: auto;
	gap: 10px;
`;

export const ActiveAddsSection = styled(HStack).attrs(() => ({
	alignItems: "center",
	space: 4,
	backgroundColor: "blue.100",
	borderRadius: 7,
	padding: 3,
}))``;
