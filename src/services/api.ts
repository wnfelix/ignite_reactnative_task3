import axios, { AxiosError, AxiosInstance } from "axios";

type SignOut = () => void;

interface IPromiseType {
	onSuccess: (token: string) => void;
	onFailure: (error: AxiosError) => void;
}

interface IAPIInstanceProps extends AxiosInstance {
	registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

const api = axios.create({
	baseURL: "http://192.168.15.126:3333",
}) as IAPIInstanceProps;

export { api };
