import { Flex } from 'antd';
import { StepColumn } from 'widgets/StepColumn/StepColumn';
import Styles from './style.module.scss';
import { IStep, ITask } from 'constants/Models';
import { useTasks } from 'hooks/useTasks';
import { useCallback, useMemo } from 'react';

interface IProps {
	steps: IStep[];
	currentStep: number | null;
	setCurrentStep: (stepId: number | null) => void;
	width?: number
}

export function KanbanSteps(props: IProps) {
	const { tasks } = useTasks()

	/*const tasks = Array.from(Array(20), (_, i): ITask => ({
		id: i,
		step: 2,
		title: 'task ' + i,
		body: {},
		category: null,
		deadline: null,
		starts: null,
		stepReason: null,
		inBasket: false,
	}))*/

	const stepTasks = useCallback((stepId: number) => {
		return tasks.filter(task => task.step === stepId)
	}, [tasks])

	return (
		<Flex className={Styles.KanbanSteps}>
			{props.steps.map((step) => (
				<StepColumn
					tasks={stepTasks(step.id)}
					width={props.width}
					key={step.id}
					id={step.id}
					name={step.name}
					icon={step.icon}
					open={props.currentStep}
					setOpen={props.setCurrentStep}
				/>
			))}
		</Flex>
	);
}
