import { useEffect } from 'react';

function createHandler(callback: (e: KeyboardEvent) => void) {
	return function (e: KeyboardEvent) {
		const modal = document.querySelector('.ant-modal-wrap') as HTMLElement;
		if (!modal || modal.style.display === 'none') {
			callback(e);
		}
	};
}

export function useHandleKeyPress(callback: (e: KeyboardEvent) => void) {
	const handler = createHandler(callback);

	useEffect(() => {
		window.addEventListener('keyup', handler);
		return () => window.removeEventListener('keyup', handler);
	}, []);
}
