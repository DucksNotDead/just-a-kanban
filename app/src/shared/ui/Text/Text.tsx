import React, { useMemo } from 'react';
import Styles from './Text.module.scss';

interface IProps {
	children?: string;
	color?: 'black' | 'primary' | 'secondary' | 'dark-grey';
	type?: 'tint' | 'bold';
}

export function Text(props: IProps) {
	const color = useMemo(
		() => props.color ?? 'black',
		[props.color],
	);

	return (
		<p className={`${Styles['Color-' + color]}`}>
			{props.children}
		</p>
	);
}
