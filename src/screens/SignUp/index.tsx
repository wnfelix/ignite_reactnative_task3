import {
	JSXElementConstructor,
	ReactNode,
	cloneElement,
	useState,
} from "react";
import axios from "axios";
import { Image, ScrollView, Text, useToast } from "native-base";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import { AuthNatigatorRoutesProps } from "@routes/auth.routes";
import { userApi } from "@api/userApi";
import { IInputProps, Input } from "@components/Input";
import { InputPassword } from "@components/InputPassword";
import { AppError } from "@utils/AppError";

import Avatar from "@assets/Avatar.png";
import {
	AvatarEditButton,
	BackButton,
	Container,
	CreateButton,
	Footer,
	Main,
	SectionAvatar,
} from "./styles";
import { Header } from "./components/Header";

interface IFormDataProps {
	name: string;
	email: string;
	phone: string;
	password: string;
	confirmPassword: string;
}

const signUpSchema = yup.object({
	name: yup.string().required("Informe o nome"),
	email: yup.string().required("Informe o email").email("Email inválido"),
	phone: yup
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
	const navigator = useNavigation<AuthNatigatorRoutesProps>();
	const toast = useToast();
	const [avatar, setAvatar] = useState<string>();
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
			console.log({ ...data, avatar });
			await createUser({ ...data, avatar });
			//await signIn(email, password);
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
			}
		}
	}

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
						<Image source={Avatar} alt="avatar" />
						<AvatarEditButton
							icon={<FontAwesome6 name="pencil" size={10} color="white" />}
						/>
					</SectionAvatar>
					<Controller
						control={control}
						name="name"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Nome"
								onChangeText={onChange}
								value={value}
								errorMessage={errors.name?.message}
								bgColor="white"
							/>
						)}
					/>
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="E-mail"
								onChangeText={onChange}
								value={value}
								errorMessage={errors.email?.message}
								bgColor="white"
							/>
						)}
					/>
					<Controller
						control={control}
						name="phone"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Telefone"
								onChangeText={onChange}
								value={value}
								errorMessage={errors.phone?.message}
								bgColor="white"
							/>
						)}
					/>
					<Controller
						control={control}
						name="password"
						render={({ field: { onChange, value } }) => (
							<InputPassword
								placeholder="Senha"
								onChangeText={onChange}
								value={value}
								errorMessage={errors.password?.message}
								bgColor="white"
							/>
						)}
					/>
					<Controller
						control={control}
						name="confirmPassword"
						render={({ field: { onChange, value } }) => (
							<InputPassword
								placeholder="Confirmar Senha"
								onChangeText={onChange}
								value={value}
								errorMessage={errors.confirmPassword?.message}
								bgColor="white"
							/>
						)}
					/>
					<CreateButton
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
