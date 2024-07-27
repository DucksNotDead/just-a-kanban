import { ITask } from 'constants/Models';
import { MouseEventHandler, useCallback } from 'react';
import Styles from './TaskCard.module.scss'

interface IProps {
	task: ITask
}

export function TaskCard(props: IProps) {
	const handleCardClick = useCallback<MouseEventHandler>((e) => {
		e.stopPropagation()
		//...
	}, []);

	return (
		<div
			data-id={props.task.id}
			onClick={handleCardClick}
			className={Styles.TaskCard}
		>
			<h4>
				{ props.task.title.slice(0,1).toUpperCase() + props.task.title.slice(1) }
			</h4>
		</div>
	)
}