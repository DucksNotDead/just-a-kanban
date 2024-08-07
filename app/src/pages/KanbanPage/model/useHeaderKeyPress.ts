import { RefObject, useCallback } from 'react';
import { InputRef } from 'antd';
import { useHandleKeyPress } from 'shared';

export function useHeaderKeyPress(
	input: RefObject<InputRef>,
	addButton: RefObject<HTMLButtonElement>,
) {
	const handleKeyPress = useCallback(
		(e: KeyboardEvent) => {
			const target = e.target as HTMLElement;
			const isInput = target.tagName === 'INPUT';
			switch (String(e.code).toLowerCase()) {
				case 'keya': {
					!isInput && addButton.current?.click();
					break;
				}
				case 'keyf': {
					!isInput && input.current?.focus();
					break;
				}
				case 'escape':
				case 'enter': {
					isInput && input.current?.blur();
					break;
				}
			}
		},
		[input, addButton],
	);

	useHandleKeyPress(handleKeyPress);
}
