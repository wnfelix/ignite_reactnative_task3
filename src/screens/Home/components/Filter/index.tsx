import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Heading, Text, HStack, VStack, Checkbox, Switch } from 'native-base';
import BottomSheet, {
	BottomSheetView,
	BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { Button } from '@components/Button';
import { Chip } from './components/Chip';
import { ApplyButton, ClearButton, TextButton } from './styles';

interface IFilterProps {
	show: boolean;
	onClose: () => void;
}

export function Filter(props: IFilterProps) {
	const [sectionIndex, setSectionIndex] = useState(0);
	const bottomSheetRef = useRef<BottomSheet>(null);

	useEffect(() => {
		setSectionIndex(props.show ? 1 : 0);
	}, [props.show]);

	const handleSheetChanges = useCallback((index: number) => {
		if (index <= 0) {
			props.onClose();
		}
	}, []);

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
					<Chip onSelected={() => console.log('teste')} title="NOVO" />
					<Chip onSelected={() => console.log('teste')} title="USADO" />
				</HStack>
				<VStack my="3">
					<Text bold>Aceita troca?</Text>
					<Switch
						size="lg"
						onToggle={() => console.log('mudou')}
						width="10"
						height="8"
					/>
				</VStack>
				<Text bold>Meios de pagamento aceitos</Text>
				<Checkbox size="sm" value="ticket">
					Boleto
				</Checkbox>
				<Checkbox size="sm" value="pix">
					Pix
				</Checkbox>
				<Checkbox size="sm" value="money">
					Dinheiro
				</Checkbox>
				<Checkbox size="sm" value="creditCard">
					Cartão de Crédito
				</Checkbox>
				<Checkbox size="sm" value="bankDeposit">
					Depósito Bancário
				</Checkbox>
				<HStack mt="12" justifyContent="space-around">
					<ClearButton>
						<TextButton color="black">Limpar filtros</TextButton>
					</ClearButton>
					<ApplyButton>
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
