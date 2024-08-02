import { IPhotoFile, IProduct, PaymentMethodType } from 'src/interfaces';
import { api } from './api';

interface IManageProduct
	extends Omit<IProduct, 'user' | 'product_images' | 'is_active'> {
	product_images: IPhotoFile[];
}

export interface IGetAllParams {
	is_new?: boolean;
	accept_trade?: boolean;
	payment_methods?: PaymentMethodType[];
	query?: string;
}
async function getAll(filter?: IGetAllParams) {
	const params = new URLSearchParams();
	if (filter?.is_new !== undefined)
		params.append('is_new', filter.is_new.toString());
	if (filter?.accept_trade !== undefined)
		params.append('accept_trade', filter?.accept_trade.toString());
	if (filter?.payment_methods)
		filter.payment_methods.forEach(p => params.append('payment_methods', p));
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

async function create(entity: IManageProduct) {
	const payload = {
		...entity,
		price: entity.price * 100,
		payment_methods: entity.payment_methods.map(p => p.key),
	};

	const { data: p } = await api.post<IProduct>('products', payload);
	await addPhotos(p.id, entity.product_images);

	return new Promise<IProduct>(resolve => resolve(p));
}

async function update(entity: IManageProduct) {
	const { product_images: actualImages } = await getOne(entity.id);
	const newImages: IPhotoFile[] = [];
	const delImages: string[] = [];

	//updating product
	const payload = {
		...entity,
		price: entity.price * 100,
		payment_methods: entity.payment_methods.map(p => p.key),
	};
	await api.put<IProduct>(`products/${entity.id}`, payload);

	//removing images
	actualImages.forEach(im => {
		const existImage = entity.product_images.find(i => i.name === im.id);
		if (!existImage) {
			delImages.push(im.id);
		}
	});
	if (delImages.length > 0) await deleteImages(delImages);

	//insert new images
	entity.product_images.forEach(i => {
		const existImage = actualImages.find(im => im.id === i.name);
		if (!existImage) {
			newImages.push(i);
		}
	});
	if (newImages.length > 0) await addPhotos(entity.id, newImages);

	return new Promise<void>(resolve => resolve());
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

async function changeStatus(productId: string, active: boolean) {
	return api.patch(`products/${productId}`, { is_active: active });
}

async function deleteProduct(productId: string) {
	return api.delete(`products/${productId}`);
}

async function deleteImages(ids: string[]) {
	return api.delete('products/images', { data: { productImagesIds: ids } });
}

export default {
	create,
	addPhotos,
	getAll,
	getOne,
	getPhotoUri,
	changeStatus,
	deleteProduct,
	update,
};
