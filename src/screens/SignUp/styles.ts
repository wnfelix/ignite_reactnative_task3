import styled from "styled-components/native";
import { HStack, IconButton, VStack } from "native-base";
import { Button } from "@components/Button";

export const Container = styled(VStack).attrs(() => ({
	flex: 1,
	bgColor: "gray.600",
	padding: 10,
}))``;

export const Main = styled(VStack).attrs(() => ({
	alignItems: "center",
	space: 3,
}))``;

export const SectionAvatar = styled(HStack).attrs(() => ({
	justifyContent: "center",
	mt: 8,
}))``;

export const CreateButton = styled(Button).attrs(() => ({
	bgColor: "black",
	w: "full",
}))``;

export const BackButton = styled(Button).attrs(() => ({
	w: "full",
}))``;

export const Footer = styled(VStack).attrs(() => ({
	flex: 1,
	justifyContent: "flex-end",
	space: 5,
	alignItems: "center",
}))``;
