import { Heading, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";

import FavIcon from "@assets/Favicon.svg";
import { Container } from "@styles/global";
import { AuthNatigatorRoutesProps } from "@routes/auth.routes";
import { InputPassword } from "@components/InputPassword";
import { Input } from "@components/Input";
import { Footer, Main, SignInButton, SignUpButton } from "./styles";
import { userApi } from "@api/userApi";

export function SignIn() {
	const navigator = useNavigation<AuthNatigatorRoutesProps>();

	function handleSignUp() {
		navigator.navigate("signUp");
	}

	return (
		<Container>
			<Main>
				<FavIcon />
				<Heading fontSize="xl">marketspace</Heading>
				<Text mb={10} fontSize="sm">
					Seu espaço de compra e venda
				</Text>

				<Text fontSize="xs">Acesse sua conta</Text>
				<Input placeholder="E-mail" />
				<InputPassword placeholder="Senha" />
				<SignInButton>Entrar</SignInButton>
			</Main>
			<Footer>
				<Text>Ainda não tem acesso?</Text>
				<SignUpButton onPress={handleSignUp}>
					<Text color="black" bold>
						Criar uma conta
					</Text>
				</SignUpButton>
			</Footer>
		</Container>
	);
}
