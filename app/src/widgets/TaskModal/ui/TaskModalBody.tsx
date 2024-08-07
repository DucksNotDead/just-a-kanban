import Styles from './TaskModalBody.module.scss';
import { ITaskFull } from 'entities/Task';
import { Input, InputRef } from 'antd';
import { FormEventHandler, useCallback, useEffect, useRef } from 'react';
import { TodoList } from 'features/TodoList';
import { useLog } from 'shared';

interface IProps {
	viewMode: boolean;
	data: Pick<ITaskFull, 'title' | 'body'> | null;
	onTitleChange: (title: string) => void;
	onBodyChange: (body: any) => void;
}

export function TaskModalBody(props: IProps) {
	const handleTitleInput = useCallback<FormEventHandler<HTMLInputElement>>(
		(e) => {
			props.onTitleChange((e.target as HTMLInputElement).value);
		},
		[],
	);
	return (
		<div className={Styles.TaskModalBody}>
			<div className={Styles.TaskModalBodyHeader}>
				{props.viewMode ? (
					props.data?.title
				) : (
					<Input
						disabled={props.viewMode}
						value={props.data?.title}
						variant={'borderless'}
						onInput={handleTitleInput}
						maxLength={40}
					/>
				)}
			</div>
			<div className={Styles.TaskModalBodyEditor}>
				<TodoList
					items={props.data?.body?.todos ?? []}
					setItems={(todos) => props.onBodyChange({ todos })}
					editMode={!props.viewMode}
				/>
			</div>
		</div>
	);
}
