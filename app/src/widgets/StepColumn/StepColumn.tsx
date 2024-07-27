import Styles from './StepColumn.module.scss';
import { MutableRefObject, useCallback, useMemo, useRef } from 'react';
import { IStep, ITask } from 'constants/Models';
import { useShownStyles } from 'hooks/useShownStyles';
import { useStepColumnLayoutAnimation } from './lib/useStepColumnLayoutAnimation';
import { Title } from 'entities/Title';
import { TaskCard } from 'widgets/StepColumn/TaskCard';
import { useResizeDetector } from 'react-resize-detector';

interface IProps extends IStep {
	open: number | null;
	setOpen: (stepId: number | null) => void;
	width?: number;
	tasks: ITask[]
}

export function StepColumn(props: IProps) {
	const columnRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
	const shown = useShownStyles(Styles, 'Transition');

	const isOpen = useMemo(() => {
		return props.open === null || props.open === props.id;
	}, [props.open]);

	const isFullScreen = useMemo(() => props.open === props.id, [props.open])

	const toggleOpen = useCallback(() => {
		props.setOpen(props.open === props.id ? null : props.id);
	}, [isOpen, props.open]);

	useStepColumnLayoutAnimation(
		columnRef,
		isFullScreen,
		!isOpen,
		props.width
	);

	return (
		<div
			ref={columnRef}
			onClick={toggleOpen}
			className={`${Styles.StepColumn} ${shown} ${isOpen ? Styles.Open : ''}`}
		>
			<div className={`${Styles.TitleBox} ${isFullScreen? Styles.Open : ''} ${!isOpen? Styles.Hidden : ''}`}>
				<Title>{ props.name }</Title>
			</div>
			<div className={`${Styles.TaskCards} taskCards`}>
				{props.tasks.map(task => (
					<TaskCard key={task.id} task={task}/>
				))}
				<div className={Styles.ScrollPadding}/>
			</div>
		</div>
	);
}
