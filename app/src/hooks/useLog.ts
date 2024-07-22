import { useEffect } from 'react';

export function useLog(...state: any) {
	useEffect(() => {
		console.log(...state);
	}, [...state]);
}