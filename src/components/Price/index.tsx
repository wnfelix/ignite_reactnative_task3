import React from 'react';
import { HStack, Text, ITextProps } from 'native-base';
import { formatNumber } from '@utils/numberUtils';

interface IPriceProps
	extends Pick<ITextProps, 'color' | 'fontSize' | 'pb' | 'pt'> {
	value: number;
	symbolSize?: ITextProps['fontSize'];
}
export function Price({
	color = 'black',
	symbolSize = 16,
	pb = 1,
	pt,
	...props
}: IPriceProps) {
	return (
		<HStack flexDirection="row" alignItems="flex-end" space={1}>
			<Text color={color} fontSize={symbolSize} pb={pb} pt={pt} bold>
				R$
			</Text>
			<Text color={color} fontSize={props.fontSize} bold>
				{formatNumber(props.value)}
			</Text>
		</HStack>
	);
}
