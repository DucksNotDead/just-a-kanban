import { useCallback, useEffect, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { useSteps } from 'entities/Step';
import { Page } from 'shared';
import { KanbanPageHeaderPanel } from './KanbanPageHeaderPanel';
import { KanbanPageSteps } from './KanbanPageSteps';

export function KanbanPage() {
	const { steps } = useSteps();
	const [chosenStep, setChosenStep] = useState<number | null>(null);
	const [oneStepMode, setOneStepMode] = useState(false);

	const handleResize = useCallback(
		(width: number | null) => {
			if (width) {
				if (width < 1000) {
					setOneStepMode(() => true);
					setChosenStep(() => steps[0]?.id ?? null);
				} else {
					setOneStepMode(() => false);
					setChosenStep(() => null);
				}
			}
		},
		[steps],
	);

	const handleToggleCurrentStep = useCallback(
		(step: number | null) => {
			if (oneStepMode && !step) {
				return;
			}
			setChosenStep(() => step);
		},
		[oneStepMode],
	);

	const { width, ref } = useResizeDetector({
		onResize: (payload) => handleResize(payload.width),
		handleHeight: false,
	});

	useEffect(() => {
		handleResize(window.innerWidth);
	}, [steps]);

	return (
		<div ref={ref}>
			<Page>
				<KanbanPageHeaderPanel
					steps={steps}
					currentStep={chosenStep}
					setCurrentStep={setChosenStep}
				/>
				<KanbanPageSteps />
			</Page>
		</div>
	);
}
