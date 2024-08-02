import React from 'react';
import { HStack, Icon, IconButton } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigatorRoutesProps } from '@routes/app.routes';
import { BackIconButton } from '@components/BackIconButton';
import { useAuth } from '@hooks/useAuth';
import { IProduct, IUser } from 'src/interfaces';

interface IHeaderProps extends Pick<IProduct, 'id' | 'user'> {}

export function Header({ id, ...props }: IHeaderProps) {
	const { user } = useAuth();
	const navigator = useNavigation<AppStackNavigatorRoutesProps>();

	return (
		<HStack justifyContent="space-between" p={1}>
			<BackIconButton />
			{props.user.avatar === user.avatar && (
				<IconButton
					borderRadius="full"
					icon={<Icon as={AntDesign} name="edit" color="black" size="xl" />}
					onPress={() => navigator.navigate('editAd', { id: id })}
				/>
			)}
		</HStack>
	);
}
