import React from 'react';
import { IImageProps } from 'native-base';
import { AvatarImage } from './styles';
import { api } from '@services/api';

interface IAvatarProps extends Pick<IImageProps, 'size'> {
	avatar: string;
}

export function Avatar({ avatar, ...props }: IAvatarProps) {
	return (
		<AvatarImage
			{...props}
			source={{ uri: `${api.defaults.baseURL}images/${avatar}` }}
			alt="avatar"
		/>
	);
}
