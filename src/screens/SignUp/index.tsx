import { cloneElement, useContext, useState } from "react";
import axios from "axios";
import { ScrollView, Text, useToast } from "native-base";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { AuthNatigatorRoutesProps } from "@routes/auth.routes";
import { userApi } from "@api/userApi";
import { IInputProps, Input } from "@components/Input";
import { InputPassword } from "@components/InputPassword";
import { AppError } from "@utils/AppError";
import { AuthContext } from "@contexts/AuthContext";
import { IPhotoFile, IUser } from "src/interfaces";

import {
	BackButton,
	Container,
	CreateButton,
	Footer,
	Main,
	SectionAvatar,
} from "./styles";
import { Header } from "./components/Header";
import { AvatarPhoto } from "./components/AvatarPhoto";

interface IFormDataProps extends Pick<IUser, "name" | "email" | "tel"> {
	password: string;
	confirmPassword: string;
}

const signUpSchema = yup.object({
	name: yup.string().required("Informe o nome"),
	email: yup.string().required("Informe o email").email("Email inválido"),
	tel: yup
		.string()
		.required("É obrigatório informar o telefone")
		.min(11, "Informe o telefone com DDD"),
	password: yup
		.string()
		.required("Informe a senha")
		.min(6, "A senha deve ter pelo menos 6 dígitos"),
	confirmPassword: yup
		.string()
		.required("Confirme a senha")
		.min(6, "A senha deve ter pelo menos 6 dígitos")
		.oneOf([yup.ref("password")], "A senha é diferente"),
});

export function SignUp() {
	const { signIn } = useContext(AuthContext);
	const navigator = useNavigation<AuthNatigatorRoutesProps>();
	const toast = useToast();
	const [avatar, setAvatar] = useState<IPhotoFile>({} as IPhotoFile);
	const [isLoading, setIsLoading] = useState(false);
	const { createUser } = userApi();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormDataProps>({
		resolver: yupResolver(signUpSchema),
	});

	function handleSignIn() {
		navigator.goBack();
	}

	async function handleSignUp(data: IFormDataProps) {
		try {
			setIsLoading(true);
			await createUser(data, avatar);

			toast.show({
				title: "Cadastrado com sucesso",
				placement: "top",
				bgColor: "green.500",
			});
			await signIn(data.email, data.password);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			const isAppError = error instanceof AppError;
			const title = isAppError
				? error.message
				: "Não foi possível criar a conta tente novamente mais tarde";

			toast.show({
				title: title,
				placement: "top",
				bgColor: "red.500",
			});

			if (axios.isAxiosError(error)) {
				console.log("axios error", error.response?.data.message);
				console.log("axios error", error.response);
			}
		}
	}

	/**
	 * Generate HookForm Controller
	 * @param fieldName internal name field
	 * @param placeHolder label display on field
	 * @param FieldControl input control
	 * @param errorMessage message error if exists
	 * @returns HookForm Controller
	 */
	function formField(
		fieldName: keyof IFormDataProps,
		placeHolder: string,
		FieldControl: React.ReactElement<IInputProps>,
		errorMessage: string | undefined
	) {
		return (
			<Controller
				control={control}
				name={fieldName}
				render={({ field: { onChange, value } }) =>
					cloneElement(FieldControl, {
						placeholder: placeHolder,
						onChangeText: onChange,
						value: value,
						errorMessage: errorMessage,
						bgColor: "white",
					})
				}
			/>
		);
	}

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			showsVerticalScrollIndicator={false}
		>
			<Container>
				<Header />
				<Main>
					<SectionAvatar>
						<AvatarPhoto onChange={setAvatar} />
					</SectionAvatar>
					{formField("name", "Nome", <Input />, errors.name?.message)}
					{formField("email", "E-mail", <Input />, errors.email?.message)}
					{formField("tel", "Telefone", <Input />, errors.tel?.message)}
					{formField(
						"password",
						"Senha",
						<InputPassword />,
						errors.password?.message
					)}
					{formField(
						"confirmPassword",
						"Confirmar Senha",
						<InputPassword />,
						errors.confirmPassword?.message
					)}
					<CreateButton
						isLoading={isLoading}
						_pressed={{
							bgColor: "gray.400",
						}}
						onPress={handleSubmit(handleSignUp)}
					>
						<Text color="white">Criar</Text>
					</CreateButton>
				</Main>
				<Footer>
					<Text>Já tem uma conta?</Text>
					<BackButton
						_pressed={{
							bgColor: "gray.400",
						}}
						onPress={handleSignIn}
					>
						<Text>Ir para login</Text>
					</BackButton>
				</Footer>
			</Container>
		</ScrollView>
	);
}
