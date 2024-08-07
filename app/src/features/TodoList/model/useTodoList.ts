import {
	FocusEvent,
	FormEvent,
	KeyboardEvent,
	useCallback,
	useEffect,
	useRef,
} from 'react';
import { ITodoListInstance } from 'features/TodoList/model/types';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

function caretAtEnd(elem: HTMLTextAreaElement) {
	const elemLen = elem.value.length;
	if (elem.selectionStart || elem.selectionStart === 0) {
		elem.selectionStart = elemLen;
		elem.selectionEnd = elemLen;
		elem.focus();
	}
}

export function useTodo({ setItems, items }: ITodoListInstance) {
	const listRef = useRef<HTMLDivElement>(null);
	const prevKeys = useRef<string[]>([]);
	const firstLaunch = useRef(true);

	const focus = useCallback(
		(itemKey: string) => {
			const elem = Array.from(listRef.current?.children ?? [])
				.map((el) => el as HTMLElement)
				.find((el) => el.dataset.key === itemKey);

			elem?.scrollIntoView({ behavior: 'smooth' });

			caretAtEnd(elem?.querySelector('textarea') as HTMLTextAreaElement);
		},
		[listRef.current],
	);

	const set = useCallback(
		(
			itemKey: string,
			field: 'label' | 'checked',
			newValue: string | boolean,
		) => {
			const index = items.findIndex((item) => item.key === itemKey);
			if (index !== -1) {
				items[index][field] = newValue as never;
				setItems([...items]);
			}
		},
		[items, setItems],
	);

	const add = useCallback(
		(after?: number) => {
			if (after === undefined) after = items.length - 1;
			setItems([
				...items.slice(0, after + 1),
				{ key: 'todo' + Date.now().toString(), label: '', checked: false },
				...items.slice(after + 1),
			]);
		},
		[items],
	);

	const remove = useCallback(
		(itemKey: string) => {
			setItems(items.filter((todo) => todo.key !== itemKey));
		},
		[items],
	);

	const handleInputKeyPress = useCallback(
		(e: KeyboardEvent<HTMLTextAreaElement>, itemKey: string) => {
			const { code } = e;
			const value =
				items.find((item) => item.key === itemKey)?.label ?? '';
			const itemIndex = items.findIndex((item) => item.key === itemKey);
			switch (code) {
				case 'Enter': {
					if (value.length) {
						add(itemIndex);
					}
					break;
				}
				case 'Backspace': {
					if (!value.length && items.length > 1) {
						e.preventDefault();
						let index = itemIndex - 1;
						if (index < 0) index = 1;
						remove(itemKey);
						focus(items[index].key);
					}
					break;
				}
			}
		},
		[items, add, set],
	);

	const handleInput = useCallback(
		(e: FormEvent<HTMLTextAreaElement>, itemKey: string) => {
			const target = e.target as HTMLInputElement;
			set(itemKey, 'label', target.value.replace(/\n/g, ''));
		},
		[set],
	);

	const handleToggle = useCallback(
		(e: CheckboxChangeEvent, itemKey: string) => {
			set(itemKey, 'checked', e.target.checked);
		},
		[set],
	);

	const handleBlur = useCallback(
		({ target }: FocusEvent<HTMLTextAreaElement>, itemKey: string) => {
			if (!target?.value?.trim().length && items.length > 1) {
				remove(itemKey);
			}
		},
		[remove, items],
	);

	useEffect(() => {
		const itemKeys = items.map((item) => item.key);

		if (listRef.current && !prevKeys.current.length) {
			prevKeys.current = itemKeys;
			return;
		}

		if (prevKeys.current.length !== itemKeys.length) {
			if (prevKeys.current.length < itemKeys.length) {
				focus(
					itemKeys.find((key) => !prevKeys.current.includes(key)) ?? '',
				);
			}
			prevKeys.current = itemKeys;
		}
	}, [listRef.current, prevKeys.current, items]);

	return {
		handleInputKeyPress,
		handleInput,
		handleToggle,
		handleBlur,
		listRef,
	};
}
