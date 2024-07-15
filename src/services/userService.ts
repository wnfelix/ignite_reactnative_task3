import { api } from '@services/api';
import { IPhotoFile, IUser } from 'src/interfaces';

interface ISessionUser {
	token: string;
	user: IUser;
	refresh_token: string;
}

interface ICreateUserData extends Pick<IUser, 'name' | 'email' | 'tel'> {
	password: string;
}

async function create(user: ICreateUserData, avatar: IPhotoFile) {
	const payloadForm = new FormData();

	payloadForm.append('name', user.name);
	payloadForm.append('email', user.email);
	payloadForm.append('tel', user.tel);
	payloadForm.append('password', user.password);
	payloadForm.append('avatar', avatar as any);

	return api.post('/users', payloadForm, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}

async function login(email: string, password: string) {
	return api.post<ISessionUser>('/sessions', { email, password });
}

export default {
	create,
	login,
};
