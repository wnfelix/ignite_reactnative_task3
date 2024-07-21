export const formatCurrency = (value: number) =>
	Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
		value
	);

export const formatNumber = (value: number, decimalDigits = 2) =>
	value.toLocaleString(undefined, {
		minimumFractionDigits: decimalDigits,
		maximumFractionDigits: decimalDigits,
	});
