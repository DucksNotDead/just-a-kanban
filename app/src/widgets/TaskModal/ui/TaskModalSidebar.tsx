import Styles from './TaskModalSidebar.module.scss';
import { Title, useAnimatedStyle, useLog } from 'shared';
import { Button } from 'antd';
import { ITaskMeta } from 'entities/Task';
import { SaveOutlined } from '@ant-design/icons';
import { TaskMetaForm } from 'features/TaskMeta';

interface IProps {
	isOpen: boolean;
	data: ITaskMeta | null;
	onChange: (meta: ITaskMeta) => void;
	onSave: () => void;
	onCancel: () => void;
	saving: boolean;
}

export function TaskModalSidebar(props: IProps) {
	const openStyle = useAnimatedStyle(Styles.Open, props.isOpen)
	return (
		<div
			className={`${Styles.TaskModalSidebar} ${openStyle}`}
		>
			<div
				className={`${Styles.TaskModalSidebarInner} ${openStyle}`}
			>
				<div className={`${Styles.TaskModalSidebarItem}`}>
					<Title>Мета</Title>
				</div>
				<div className={Styles.TaskModalSidebarContent}>
					<TaskMetaForm data={props.data} onChange={props.onChange} />
				</div>
				<div className={`${Styles.TaskModalSidebarItem}`}>
					<Button type={'primary'} loading={props.saving} onClick={props.onSave}>
						сохранить
						<SaveOutlined />
					</Button>
					<Button
						type={'text'}
						onClick={props.onCancel}
					>
						отменить
					</Button>
				</div>
			</div>
		</div>
	);
}
