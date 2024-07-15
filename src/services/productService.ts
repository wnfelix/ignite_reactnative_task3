import { IProduct } from 'src/interfaces';
import { api } from './api';

async function create(
	entity: Omit<IProduct, 'id' | 'user' | 'product_images'>
) {
	const payload = { ...entity };

	return api.post('products', payload);
}

export default {
	create,
};
