import { ReactNode, useMemo } from 'react';
import Styles from './style.module.scss';

export interface IProps {
	children: ReactNode;
	color: string;
	backgroundColor?: string;
	className?: string;
	id?: number
}

export function Card(props: IProps) {
	const backgroundColor = useMemo(() => {
		if (!props.backgroundColor) {
			const slices = props.color
				.replace(/[rgb()]*/g, '')
				.split(',', 3);
			slices.push('.15');
			return `rgba(${slices.join(',')})`;
		} else {
			return props.backgroundColor;
		}
	}, [props.color, props.backgroundColor]);

	return (
		<div
			data-id={props.id}
			className={`${Styles.Card} ${props.className ?? ''}`}
			style={{
				borderColor: props.color,
			}}
		>
			<div
				className={Styles.CardInner}
				style={{
					backgroundColor,
				}}
			>
				{props.children}
			</div>
		</div>
	);
}
