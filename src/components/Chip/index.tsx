import React from 'react';
import { Box, Text, IBoxProps, ITextProps } from 'native-base';
import { ResponsiveValue } from 'native-base/lib/typescript/components/types';
import { IColors } from 'native-base/lib/typescript/theme/base/colors';

export interface IChipProps extends IBoxProps, Pick<ITextProps, 'bold'> {
	title: string;
	//bg?: ResponsiveValue<IColors | (string & {})>;
	//color?: ResponsiveValue<IColors | (string & {})>;
}

export function Chip({
	title,
	bg = 'gray.200',
	color = 'white',
	borderWidth = 1,
	bold,
	...props
}: IChipProps) {
	return (
		<Box
			h={6}
			px={2}
			bg={bg}
			borderRadius="2xl"
			borderWidth={borderWidth}
			alignItems="center"
			justifyContent="center"
			{...props}
		>
			<Text color={color} fontSize={10} bold={bold}>
				{title}
			</Text>
		</Box>
	);
}
