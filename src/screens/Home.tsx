import { useAuth } from "@hooks/useAuth";
import { Container } from "@styles/global";
import { Text } from "native-base";

export function Home() {
	const { user } = useAuth();

	return (
		<Container>
			<Text>{user.name}</Text>
		</Container>
	);
}
