import FavIcon from "@assets/Favicon.svg";
import { Heading, Text } from "native-base";
import { Container } from "./styles";

export function Header() {
	return (
		<Container>
			<FavIcon width={80} height={80} />
			<Heading>Boas vindas!</Heading>
			<Text>
				Crie sua conta e use o espaço para comprar itens variados e vender seus
				produtos
			</Text>
		</Container>
	);
}
