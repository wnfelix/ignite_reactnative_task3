export function parseNumber(stringNumber: string, locale: string = 'pt-BR') {
	const formatter = new Intl.NumberFormat(locale);
	const parts = formatter.formatToParts(12345.6);
	const groupSeparator = parts.find(part => part.type === 'group')!.value;
	const decimalSeparator = parts.find(part => part.type === 'decimal')!.value;

	const normalizedString = stringNumber
		.replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
		.replace(decimalSeparator, '.');

	return parseFloat(normalizedString);
}
