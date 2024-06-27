import React from "react";
import { Box, Text, useTheme } from "native-base";
import { ResponsiveValue } from "native-base/lib/typescript/components/types";
import { IColors } from "native-base/lib/typescript/theme/base/colors";

interface IChipProps {
	title: string;
	bg?: ResponsiveValue<IColors | (string & {})>;
	color?: ResponsiveValue<IColors | (string & {})>;
}

export function Chip({ title, bg = "gray.200", color = "white" }: IChipProps) {
	return (
		<Box
			h={6}
			px={2}
			bg={bg}
			borderRadius="2xl"
			borderWidth={1}
			alignItems="center"
			justifyContent="center"
		>
			<Text color={color} fontSize={10}>
				{title}
			</Text>
		</Box>
	);
}
