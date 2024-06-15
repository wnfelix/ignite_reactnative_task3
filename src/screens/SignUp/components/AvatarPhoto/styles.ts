import styled from "styled-components/native";
import { IconButton } from "native-base";

export const AvatarEditButton = styled(IconButton).attrs(() => ({
	position: "absolute",
	bottom: "0",
	right: "0",
	borderRadius: "full",
	bgColor: "blue.light",
	h: 9,
	w: 9,
	_pressed: {
		bgColor: "gray.400",
	},
}))``;
