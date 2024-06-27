export interface IPhotoFile {
	name: string;
	uri: string;
	type: string;
}

export interface IUser {
	id: string;
	avatar: string;
	name: string;
	email: string;
	tel: string;
}

export interface IProduct {
	id: string;
	name: string;
	description: string;
	price: number;
	is_new: boolean;
	accept_trade: boolean;
	product_images: [
		{
			id: string;
			path: string;
		}
	];
	payment_methods: [
		{
			key: string;
			name: string;
		}
	];
	user: {
		avatar: string;
	};
}
