import React from 'react';
import { Chip } from '@components/Chip';
import { IBoxProps } from 'native-base';

interface IAdItemChipProps extends IBoxProps {
	used: boolean;
}

export function AdItemChip({ used, ...props }: IAdItemChipProps) {
	return (
		<Chip
			{...props}
			bg={used ? 'gray.200' : 'primary.600'}
			title={used ? 'USADO' : 'NOVO'}
		/>
	);
}
