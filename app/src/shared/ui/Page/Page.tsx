import { ReactNode } from 'react';
import Styles from './Page.module.scss';

interface IProps {
	children: ReactNode;
	centered?: boolean;
	padding?: boolean;
}

export function Page(props: IProps) {
	return (
		<div className={`${Styles.Page} ${props.padding ? Styles.PagePadding : ''}`}>
			<div
				className={Styles.PageInner}
				style={
					props.centered
						? {
							justifyContent: 'center',
							alignItems: 'center',
						}
						: {}
				}
			>
				{props.children}
			</div>
		</div>
	);
}
