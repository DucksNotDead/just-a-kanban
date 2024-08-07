import { useConnect } from 'shared';
import { useEffect, useState } from 'react';
import { IStep } from './types';

export function useSteps() {
	const connect = useConnect();
	const [steps, setSteps] = useState<IStep[]>([]);
	const [stepsPending, setStepsPending] = useState(true);

	useEffect(() => {
		connect<IStep[]>('/steps')
			.then((response) => {
				if (response) {
					setSteps(() => response.data);
				}
			})
			.finally(() => {
				setStepsPending(() => false);
			});
	}, []);

	return { steps, stepsPending };
}