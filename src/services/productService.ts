import { IPhotoFile, IProduct } from 'src/interfaces';
import { api } from './api';

interface IGetAllParams {
	is_new?: boolean;
	accept_trade?: boolean;
	payment_methods?: string;
	query?: string;
}
async function getAll(filter?: IGetAllParams) {
	const params = new URLSearchParams();
	if (filter?.is_new !== undefined)
		params.append('is_new', filter.is_new.toString());
	if (filter?.accept_trade !== undefined)
		params.append('accept_trade', filter?.accept_trade.toString());
	if (filter?.payment_methods)
		params.append('payment_methods', filter?.payment_methods);
	if (filter?.query) params.append('query', filter?.query);

	return api
		.get<IProduct[]>(`products?${params.toString()}`)
		.then(({ data }) => data.map(p => ({ ...p, price: p.price / 100 })));
}

async function getOne(id: string) {
	return api
		.get<IProduct>(`products/${id}`)
		.then(({ data }) => ({ ...data, price: data.price / 100 }));
}

async function create(
	entity: Omit<IProduct, 'id' | 'user' | 'product_images'>
) {
	const payload = {
		...entity,
		price: entity.price * 100,
		payment_methods: entity.payment_methods.map(p => p.key),
	};

	return api.post<IProduct>('products', payload);
}

function getPhotoUri(imagePath: string) {
	return `${api.defaults.baseURL}images/${imagePath}`;
}

async function addPhotos(productId: string, photos: IPhotoFile[]) {
	const payloadForm = new FormData();

	payloadForm.append('product_id', productId);
	photos.forEach(item => payloadForm.append('images', item as any));

	return api.post('products/images', payloadForm, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}

export default {
	create,
	addPhotos,
	getAll,
	getOne,
	getPhotoUri,
};
