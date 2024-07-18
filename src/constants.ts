import { IPaymentMethod } from './interfaces';

export const paymentMethods: IPaymentMethod[] = [
	{ key: 'ticket', name: 'Boleto' },
	{ key: 'pix', name: 'Pix' },
	{ key: 'money', name: 'Dinheiro' },
	{ key: 'creditCard', name: 'Cartão de Crédito' },
	{ key: 'bankDeposit', name: 'Depósito Bancário' },
];
