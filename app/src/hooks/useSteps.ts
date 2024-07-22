import { useEffect, useState } from 'react';
import { useConnect } from './useConnect';
import { IStep } from 'constants/Models';

export function useSteps() {
	const connect = useConnect();
	const [steps, setSteps] = useState<IStep[]>([]);
	const [stepsPending, setStepsPending] = useState(true);

	useEffect(() => {
		connect<{ steps: IStep[] }>('/steps')
			.then((response) => {
				if (response) {
					setSteps(() => response.steps);
				}
			})
			.finally(() => {
				setStepsPending(() => false);
			});
	}, []);

	return { steps, stepsPending };
}
