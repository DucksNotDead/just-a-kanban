import Styles from './TodoList.module.scss';
import { Checkbox, Input } from 'antd';
import { ITodoListProps } from 'features/TodoList/model/types';
import { useTodo } from 'features/TodoList/model/useTodoList';
import TextArea from 'antd/es/input/TextArea';

export interface IProps extends ITodoListProps {}

export function TodoList(props: IProps) {
	const {
		handleToggle,
		handleInputKeyPress,
		handleInput,
		handleBlur,
		listRef,
	} = useTodo(props);

	return (
		<div ref={listRef} className={Styles.TodoList}>
			{props.items.map((todo) => (
				<div
					key={todo.key}
					data-key={todo.key}
					className={`${Styles.TodoListItem}`}
				>
					<Checkbox
						checked={todo.checked}
						disabled={!!props.editMode}
						onChange={(e) => handleToggle(e, todo.key)}
					/>
					<TextArea
						value={todo.label}
						variant={'borderless'}
						placeholder={'Что сделать?'}
						disabled={!props.editMode}
						onKeyDown={(e) => handleInputKeyPress(e, todo.key)}
						onInput={(e) => handleInput(e, todo.key)}
						onBlur={(e) => handleBlur(e, todo.key)}
						autoSize={{ minRows: 1 }}
					/>
				</div>
			))}
		</div>
	);
}
