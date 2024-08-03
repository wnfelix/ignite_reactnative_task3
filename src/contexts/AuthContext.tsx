import { createContext, useEffect, useState } from 'react';
import { IUser } from 'src/interfaces';
import { api } from '@services/api';
import {
	storageAuthTokenGet,
	storageAuthTokenRemove,
	storageAuthTokenSave,
} from '@storage/storageAuthToken';
import {
	storageUserGet,
	storageUserSave,
	storageUserRemove,
} from '@storage/storageUser';
import userService from '@services/userService';

export type AuthContextDataProps = {
	user: IUser;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	isLoadingUserStorageData: boolean;
	updateUserProfile: (userUpdated: IUser) => Promise<void>;
};

const AuthContext = createContext<AuthContextDataProps>(
	{} as AuthContextDataProps
);
AuthContext.displayName = 'Contexto com autenticação';

type AuthContextProviderProps = {
	children: React.ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState({} as IUser);
	const [isLoadingUserStorageData, setIsLoadingUserStorage] = useState(true);

	useEffect(() => {
		loadUserData();
	}, []);

	useEffect(() => {
		const subscriber = api.registerInterceptTokenManager(signOut);

		return () => subscriber();
	}, [signOut]);

	async function userAndTokenUpdate(userData: IUser, token: string) {
		api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		setUser(userData);
	}

	async function storageUserAndTokenSave(
		userData: IUser,
		token: string,
		refresh_token: string
	) {
		await storageUserSave(userData);
		await storageAuthTokenSave({ token, refresh_token });
	}

	async function signIn(email: string, password: string) {
		const { data } = await userService.login(email.trim(), password.trim());
		try {
			if (data.user && data.token && data.refresh_token) {
				setIsLoadingUserStorage(true);

				await storageUserAndTokenSave(
					data.user,
					data.token,
					data.refresh_token
				);
				userAndTokenUpdate(data.user, data.token);
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorage(false);
		}
	}

	async function signOut() {
		try {
			setIsLoadingUserStorage(true);
			setUser({} as IUser);
			await storageUserRemove();
			await storageAuthTokenRemove();
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorage(false);
		}
	}

	async function updateUserProfile(userUpdated: IUser) {
		try {
			setUser(userUpdated);
			await storageUserSave(userUpdated);
		} catch (error) {
			throw error;
		}
	}

	async function loadUserData() {
		try {
			setIsLoadingUserStorage(true);

			const userLogged = await storageUserGet();
			const { token } = await storageAuthTokenGet();

			if (token && userLogged) {
				userAndTokenUpdate(userLogged, token);
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorage(false);
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				signIn,
				isLoadingUserStorageData,
				signOut,
				updateUserProfile,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext };
