import { api } from "@services/api";
import { IPhotoFile, IUser } from "src/interfaces";

interface ISessionUser {
	token: string;
	// user: Pick<IUser, "name" | "email" | "tel"> & {
	// 	id: string;
	// 	avatar: string;
	// };
	user: IUser;
	refresh_token: string;
}

interface ICreateUserData extends Pick<IUser, "name" | "email" | "tel"> {
	password: string;
}

export function userApi() {
	return {
		createUser: (user: ICreateUserData, avatar: IPhotoFile) => {
			const payloadForm = new FormData();

			payloadForm.append("name", user.name);
			payloadForm.append("email", user.email);
			payloadForm.append("tel", user.tel);
			payloadForm.append("password", user.password);
			payloadForm.append("avatar", avatar as any);

			return api.post("/users", payloadForm, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
		},
		login: (email: string, password: string) =>
			api.post<ISessionUser>("/sessions", { email, password }),
	};
}
