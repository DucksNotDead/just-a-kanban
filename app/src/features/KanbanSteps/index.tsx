import { Flex } from 'antd';
import { StepColumn } from 'widgets/StepColumn';
import Styles from './style.module.scss';
import { IStep } from 'constants/Models';

interface IProps {
	steps: IStep[];
	currentStep: number | null;
	setCurrentStep: (stepId: number | null) => void;
	width?: number
}

export function KanbanSteps(props: IProps) {
	return (
		<Flex className={Styles.KanbanSteps}>
			{props.steps.map((step) => (
				<StepColumn
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
