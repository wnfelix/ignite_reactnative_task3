import { IPhotoFile, IProduct } from 'src/interfaces';
import { api } from './api';

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
};
