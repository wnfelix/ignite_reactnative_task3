import { Heading, Text, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import FavIcon from '@assets/Favicon.svg';
import { Container } from '@styles/global';
import { AuthNatigatorRoutesProps } from '@routes/auth.routes';
import { InputPassword } from '@components/InputPassword';
import { Input } from '@components/Input';
import { Footer, Main, SignInButton, SignUpButton } from './styles';
import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';

export function SignIn() {
	const navigator = useNavigation<AuthNatigatorRoutesProps>();
	const toast = useToast();
	const { signIn } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleSignUp() {
		navigator.navigate('signUp');
	}

	async function handleSignIn() {
		try {
			setIsLoading(true);
			await signIn(email, password);
		} catch (error) {
			const isAppError = error instanceof AppError;
			const title = isAppError
				? error.message
				: 'Não foi possível fazer login, tente novamente mais tarde!';

			toast.show({
				title: title,
				placement: 'top',
				bgColor: 'red.500',
			});
		} finally {
			setIsLoading(false);
		}
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
				<Input placeholder="E-mail" onChangeText={setEmail} value={email} />
				<InputPassword
					placeholder="Senha"
					onChangeText={setPassword}
					value={password}
				/>
				<SignInButton isLoading={isLoading} onPress={handleSignIn}>
					Entrar
				</SignInButton>
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
