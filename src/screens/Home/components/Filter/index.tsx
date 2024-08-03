import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Heading, Text, HStack, VStack, Checkbox, Switch } from 'native-base';
import BottomSheet, {
	BottomSheetView,
	BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { Chip } from './components/Chip';
import { ApplyButton, ClearButton, TextButton } from './styles';
import { paymentMethods } from 'src/constants';
import { PaymentMethodType } from 'src/interfaces';
import { IGetAllParams } from '@services/productService';

interface IFilterProps {
	show: boolean;
	onClose: () => void;
	onChange: (filter: IGetAllParams) => void;
	onReset: () => void;
}

export function Filter(props: IFilterProps) {
	const [sectionIndex, setSectionIndex] = useState(0);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [newProduct, setNewProduct] = useState(false);
	const [usedProduct, setUsedProduct] = useState(false);
	const [acceptTrade, setAcceptTrade] = useState<boolean>();
	const [payments, setPayments] = useState<PaymentMethodType[]>([]);

	useEffect(() => {
		setSectionIndex(props.show ? 1 : 0);
	}, [props.show]);

	const handleSheetChanges = useCallback((index: number) => {
		if (index <= 0) {
			props.onClose();
		}
	}, []);

	function handlePaymentType(payment: PaymentMethodType) {
		setPayments(prevState => {
			const items = [...prevState];
			const index = items.findIndex(i => i === payment);
			if (index > -1) {
				items.splice(index, 1);
			} else {
				items.push(payment);
			}

			return items;
		});
	}

	function handleApplyFilter() {
		const params: IGetAllParams = {
			accept_trade: acceptTrade,
			is_new:
				(newProduct && usedProduct) || (!newProduct && !usedProduct)
					? undefined
					: newProduct,
			payment_methods: payments.length > 0 ? payments : undefined,
		};

		setSectionIndex(0);
		props.onChange(params);
		props.onClose();
	}

	function handleClearFilter() {
		setUsedProduct(false);
		setNewProduct(false);
		setAcceptTrade(undefined);
		setPayments([]);

		setSectionIndex(0);
		// props.onChange();
		props.onReset();
		props.onClose();
	}

	return (
		<BottomSheet
			enablePanDownToClose
			snapPoints={['3%', '75%']}
			ref={bottomSheetRef}
			onChange={handleSheetChanges}
			index={sectionIndex}
			backdropComponent={BottomSheetBackdrop}
		>
			<BottomSheetView style={styles.contentContainer}>
				<Heading>Filtrar anúncios</Heading>
				<Text bold>Condição</Text>
				<HStack space="3">
					<Chip onSelected={setNewProduct} title="NOVO" />
					<Chip onSelected={setUsedProduct} title="USADO" />
				</HStack>
				<VStack my="3">
					<Text bold>Aceita troca?</Text>
					<Switch
						size="lg"
						onToggle={() => setAcceptTrade(!acceptTrade)}
						width="10"
						height="8"
						isChecked={acceptTrade}
					/>
				</VStack>
				<Text bold>Meios de pagamento aceitos</Text>
				{paymentMethods.map(item => (
					<Checkbox
						key={item.key}
						size="sm"
						value={item.key}
						isChecked={payments.findIndex(i => i === item.key) > -1}
						onChange={() => handlePaymentType(item.key)}
					>
						{item.name}
					</Checkbox>
				))}
				<HStack mt="12" justifyContent="space-around" space={4}>
					<ClearButton onPress={handleClearFilter}>
						<TextButton color="black">Resetar filtros</TextButton>
					</ClearButton>
					<ApplyButton onPress={handleApplyFilter}>
						<TextButton color="white">Aplicar filtros</TextButton>
					</ApplyButton>
				</HStack>
			</BottomSheetView>
		</BottomSheet>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		paddingHorizontal: 20,
		flex: 1,
		gap: 5,
	},
});
