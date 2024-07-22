import Styles from './style.module.scss';
import { MutableRefObject, useCallback, useMemo, useRef } from 'react';
import { IStep } from 'constants/Models';
import { useShownStyles } from 'hooks/useShownStyles';
import { useStepColumnResize } from './useStepColumnResize';
import { Card } from 'entities/Card';
import { Colors } from 'constants/Colors';

interface IProps extends IStep {
	open: number | null;
	setOpen: (stepId: number | null) => void;
	width?: number;
}

export function StepColumn(props: IProps) {
	const columnRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
	const shown = useShownStyles(Styles, 'Transition');

	const isOpen = useMemo(() => {
		return props.open === null || props.open === props.id;
	}, [props.open]);

	const toggleOpen = useCallback(() => {
		props.setOpen(props.open === props.id ? null : props.id);
	}, [isOpen, props.open]);

	useStepColumnResize(
		columnRef.current,
		props.open === props.id,
		props.width,
	);

	return (
		<div
			ref={columnRef}
			onClick={toggleOpen}
			className={`${Styles.StepColumn} ${shown} ${isOpen ? Styles.Open : ''}`}
		>
			{props.id !== 2
				? null
				: Array.from(Array(20)).map((_, i) => (
					<Card key={i} color={Colors.secondary} id={i} className={"taskCard"}>
						card {i}
					</Card>
				))}
		</div>
	);
}
