import styled from "styled-components/native";
import { HStack, IconButton, VStack } from "native-base";

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

export const AvatarEditButton = styled(IconButton).attrs(() => ({
	position: "absolute",
	bottom: "0",
	right: "0",
	borderRadius: "full",
	bgColor: "blue.light",
	h: 9,
	w: 9,
}))``;

export const Footer = styled(VStack).attrs(() => ({
	flex: 1,
	justifyContent: "flex-end",
	space: 5,
	alignItems: "center",
}))``;
