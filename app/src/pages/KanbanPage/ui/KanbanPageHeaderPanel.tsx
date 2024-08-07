import Styles from './KanbanPageHeaderPanel.module.scss';
import { IStep } from 'entities/Step';
import { Dispatch, SetStateAction, useRef } from 'react';
import { Logo, useShownStyles } from 'shared';
import { Button, Input, InputRef } from 'antd';
import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import { useHeaderKeyPress } from '../model/useHeaderKeyPress';
import { ITaskModalRef, TaskModal } from 'widgets/TaskModal';
import { useTaskCreate } from '../model/useTaskCreate';

interface IProps {
	steps: IStep[];
	currentStep: number | null;
	setCurrentStep: Dispatch<SetStateAction<number | null>>;
}

export function KanbanPageHeaderPanel(props: IProps) {
	const shown = useShownStyles(Styles);
	const input = useRef<InputRef>(null);
	const addButton = useRef<HTMLButtonElement>(null);
	const createTaskModal = useRef<ITaskModalRef>(null);

	useHeaderKeyPress(input, addButton);

	const { handleAddButtonClick, handleSave} = useTaskCreate(createTaskModal);

	return (
		<div className={`${Styles.Header} ${shown}`}>
			<div className={Styles.HeaderItem}>
				<Button
					ref={addButton}
					type={'primary'}
					onClick={handleAddButtonClick}
				>
					добавить
					<PlusCircleFilled />
				</Button>
				<Input
					ref={input}
					placeholder={'Поиск...'}
					addonAfter={<SearchOutlined />}
					style={{ width: 220 }}
				/>
			</div>
			<div className={Styles.HeaderItem}>
				<Logo />
			</div>
			<div className={Styles.HeaderItem}>Filters</div>
			<TaskModal ref={createTaskModal} />
		</div>
	);
}
