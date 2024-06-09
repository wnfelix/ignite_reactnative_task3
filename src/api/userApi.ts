import { api } from "@services/api";

export interface IUser {
	avatar?: string;
	name: string;
	email: string;
	phone: string;
	password: string;
}

export function userApi() {
	return {
		createUser: (user: IUser) =>
			api.post("/users", { tel: user.phone, ...user }),
	};
}
