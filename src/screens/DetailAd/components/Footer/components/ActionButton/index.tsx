import React from 'react';
import { HStack, Text, useTheme } from 'native-base';
import { Button, IButtonProps } from '@components/Button';
import { AntDesign } from '@expo/vector-icons';

type ActionButtonType = 'activate' | 'deactivate' | 'delete';

interface IActionButtonProps
	extends Pick<IButtonProps, 'onPress' | 'isLoading'> {
	action: ActionButtonType;
}

const actionConfigs: {
	[key in ActionButtonType]: {
		title: string;
		bgColor: string;
		icon: string;
		iconColor: string;
	};
} = {
	activate: {
		title: 'Reativar anúncio',
		bgColor: 'blue.light',
		icon: 'poweroff',
		iconColor: 'white',
	},
	deactivate: {
		title: 'Desativar anúncio',
		bgColor: 'black',
		icon: 'poweroff',
		iconColor: 'white',
	},
	delete: {
		title: 'Excluir anúncio',
		bgColor: 'gray.500',
		icon: 'delete',
		iconColor: 'gray.300',
	},
};

export function ActionButton({ action, ...props }: IActionButtonProps) {
	const theme = useTheme();
	const { title, bgColor, icon, iconColor } = actionConfigs[action];
	const color: string = theme.colors[
		iconColor as keyof typeof theme.colors
	] as string;

	return (
		<Button {...props} w="full" borderRadius={6} bgColor={bgColor}>
			<HStack alignItems="center" space={2}>
				<AntDesign name={icon as any} size={14} color={color} />
				<Text color={color} bold>
					{title}
				</Text>
			</HStack>
		</Button>
	);
}
