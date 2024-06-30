import { Text, useTheme } from 'native-base';
import { useState } from 'react';
import { Chip as PaperChip, Icon } from 'react-native-paper';
import { Props as IPaperChipProps } from 'react-native-paper/src/components/Chip/Chip';

interface IChipProps extends Omit<IPaperChipProps, 'children'> {
	onSelected: (value: boolean) => void;
	title: string;
}

export function Chip(props: IChipProps) {
	const { colors } = useTheme();
	const [closed, setClosed] = useState(true);

	function handleClose() {
		setClosed(true);
	}

	function handlePress() {
		if (closed) setClosed(false);
	}

	return (
		<PaperChip
			onPress={handlePress}
			onClose={closed ? undefined : handleClose}
			style={{
				backgroundColor: closed ? colors.gray[600] : colors.primary[600],
				borderRadius: 50,
			}}
			selectedColor="white"
			closeIcon={() => <Icon source="close-circle" size={16} color="white" />}
			{...props}
		>
			<Text bold color={closed ? colors.gray[300] : colors.white}>
				{props.title}
			</Text>
		</PaperChip>
	);
}
