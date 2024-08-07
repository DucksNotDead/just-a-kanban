import Styles from './KanbanPageSteps.module.scss'
import { useSteps } from 'entities/Step';
import { StepColumn } from 'widgets/StepColumn';
import { useTasks } from 'entities/Task';
import { useTaskCards } from '../model/useTaskCards';

export function KanbanPageSteps() {
	const { steps } = useSteps();
	const { tasks } = useTasks();
	const taskCards = useTaskCards(tasks)

	return (
		<div className={Styles.KanbanSteps}>
			{steps.map((step) => (
				<StepColumn key={step.id} step={step} cards={taskCards.inStep(step.id)} />
			))}
		</div>
	);
}
