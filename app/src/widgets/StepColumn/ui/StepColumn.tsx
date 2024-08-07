import Styles from './StepColumn.module.scss';
import { IStep } from 'entities/Step';
import { ITaskCard, TaskCard } from 'entities/Task';
import { useShownStyles } from 'shared';

interface IProps {
	step: IStep;
	cards: ITaskCard[];
}

export function StepColumn(props: IProps) {
	const shown = useShownStyles(Styles)
	return (
		<div className={`${Styles.StepColumn} ${shown}`}>
			{props.cards
				.sort(
					(a, b) =>
						new Date(b.task.updated).getTime() -
						new Date(a.task.updated).getTime(),
				)
				.map((card) => (
					<TaskCard
						key={card.task.id}
						task={card.task}
						hidden={card.hidden}
						picked={card.picked}
						pending={card.pending}
					/>
				))}
		</div>
	);
}
