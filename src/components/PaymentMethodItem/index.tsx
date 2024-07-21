import React from 'react';
import { HStack, Text } from 'native-base';
import { IPaymentMethod } from 'src/interfaces';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

interface IPaymentMethodItemProps {
	item: IPaymentMethod;
}

export function PaymentMethodItem({
	item: { key, name },
	...props
}: IPaymentMethodItemProps) {
	const size = 20;

	function RenderItem() {
		switch (key) {
			case 'boleto':
				return <Ionicons name="barcode-outline" size={size} color="black" />;
			case 'deposit':
				return <FontAwesome name="bank" size={size} color="black" />;
			case 'card':
				return <AntDesign name="creditcard" size={size} color="black" />;
			case 'cash':
				return <FontAwesome name="money" size={size} color="black" />;
			case 'pix':
				return <AntDesign name="qrcode" size={size} color="black" />;
			default:
				break;
		}
	}
	return (
		<HStack space={2} alignItems={'center'}>
			<RenderItem />
			<Text>{name}</Text>
		</HStack>
	);
}
