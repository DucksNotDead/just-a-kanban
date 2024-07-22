import Styles from './style.module.scss';
import { Logo } from 'entities/Logo';
import { IStep } from 'constants/Models';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useShownStyles } from 'hooks/useShownStyles';

interface IProps {
	steps: IStep[]
	currentStep: number|null
	setCurrentStep: Dispatch<SetStateAction<number|null>>
}

export function HeaderPanel(props: IProps) {
	const shown = useShownStyles(Styles)

	return (
		<div className={`${Styles.Header} ${shown}`}>
			<div className={Styles.HeaderItem}>Search</div>
			<div className={Styles.HeaderItem}>
				<Logo />
			</div>
			<div className={Styles.HeaderItem}>Filters</div>
		</div>
	);
}
