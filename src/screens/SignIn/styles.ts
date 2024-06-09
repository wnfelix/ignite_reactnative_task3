import { Button } from "@components/Button";
import { VStack } from "native-base";
import { styled } from "styled-components/native";

export const Main = styled(VStack).attrs(() => ({
	borderRadius: 20,
	bgColor: "gray.600",
	px: 10,
	py: 24,
	space: 2,
	alignItems: "center",
}))``;

export const SignInButton = styled(Button).attrs(() => ({
	bgColor: "blue.light",
	w: "full",
	mt: "4",
}))``;

export const SignUpButton = styled(Button).attrs(() => ({
	bgColor: "gray.500",
	w: "full",
	mt: "4",
}))``;

export const Footer = styled(VStack).attrs(() => ({
	px: 10,
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
}))``;
