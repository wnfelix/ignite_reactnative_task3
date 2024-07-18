import React from 'react';
import { Box, Text, IBoxProps } from 'native-base';
import { ResponsiveValue } from 'native-base/lib/typescript/components/types';
import { IColors } from 'native-base/lib/typescript/theme/base/colors';

export interface IChipProps extends IBoxProps {
	title: string;
	//bg?: ResponsiveValue<IColors | (string & {})>;
	//color?: ResponsiveValue<IColors | (string & {})>;
}

export function Chip({
	title,
	bg = 'gray.200',
	color = 'white',
	...props
}: IChipProps) {
	return (
		<Box
			{...props}
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
