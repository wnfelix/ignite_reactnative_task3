import { Button, Image, Input, Text } from "native-base";
import { FontAwesome6, AntDesign } from "@expo/vector-icons";
import Avatar from "@assets/Avatar.png";
import {
	AvatarEditButton,
	Container,
	Footer,
	Main,
	SectionAvatar,
} from "./styles";
import { Header } from "./components/Header";
import { useNavigation } from "@react-navigation/native";
import { AuthNatigatorRoutesProps } from "@routes/auth.routes";

export function SignUp() {
	const navigator = useNavigation<AuthNatigatorRoutesProps>();

	function handleSignIn() {
		navigator.goBack();
	}

	return (
		<Container>
			<Header />
			<Main>
				<SectionAvatar>
					<Image source={Avatar} alt="avatar" />
					<AvatarEditButton
						icon={<FontAwesome6 name="pencil" size={10} color="white" />}
					/>
				</SectionAvatar>
				<Input placeholder="Nome" bgColor="white" />
				<Input placeholder="E-mail" bgColor="white" />
				<Input placeholder="Telefone" bgColor="white" />
				<Input
					placeholder="Senha"
					InputRightElement={
						<Button pr={2} bg="white">
							<AntDesign name="eyeo" size={24} color="black" />
						</Button>
					}
					bgColor="white"
				/>
				<Input
					placeholder="Confirmar senha"
					InputRightElement={
						<Button pr={2} bg="white">
							<AntDesign name="eyeo" size={24} color="black" />
						</Button>
					}
					bgColor="white"
				/>
				<Button
					w="full"
					bgColor="black"
					_pressed={{
						bgColor: "gray.400",
					}}
				>
					<Text color="white">Criar</Text>
				</Button>
			</Main>
			<Footer>
				<Text>Já tem uma conta?</Text>
				<Button
					w="full"
					bgColor="gray.500"
					_pressed={{
						bgColor: "gray.400",
					}}
					onPress={handleSignIn}
				>
					<Text>Ir para login</Text>
				</Button>
			</Footer>
		</Container>
	);
}
