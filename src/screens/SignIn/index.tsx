import { Button, Heading, Input, Text, useTheme } from "native-base";
import { AntDesign } from "@expo/vector-icons";

import FavIcon from "@assets/Favicon.svg";
import { Footer, Main } from "./styles";
import { Container } from "@styles/global";
import { useNavigation } from "@react-navigation/native";
import { AuthNatigatorRoutesProps } from "@routes/auth.routes";

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
				<Input placeholder="E-mail" bgColor="white" rounded="lg" />
				<Input
					placeholder="Senha"
					type="password"
					bgColor="white"
					rounded="lg"
					InputRightElement={
						<Button pr={2} bg="white">
							<AntDesign name="eyeo" size={24} color="black" />
						</Button>
					}
				/>
				<Button
					w="full"
					mt={4}
					bgColor="blue.light"
					_pressed={{
						bgColor: "gray.400",
					}}
				>
					Entrar
				</Button>
			</Main>
			<Footer>
				<Text>Ainda não tem acesso?</Text>
				<Button
					w="full"
					mt={4}
					bgColor="gray.500"
					onPress={handleSignUp}
					_pressed={{
						bgColor: "gray.400",
					}}
				>
					<Text color="black" bold>
						Criar uma conta
					</Text>
				</Button>
			</Footer>
		</Container>
	);
}
