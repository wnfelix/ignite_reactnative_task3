import { IPaymentMethod } from './interfaces';

export const paymentMethods: IPaymentMethod[] = [
	{ key: 'boleto', name: 'Boleto' },
	{ key: 'pix', name: 'Pix' },
	{ key: 'cash', name: 'Dinheiro' },
	{ key: 'card', name: 'Cartão de Crédito' },
	{ key: 'deposit', name: 'Depósito Bancário' },
];
