import Styles from './TaskMetaForm.module.scss';
import { ITaskMeta } from 'entities/Task';
import { DatePicker, Form, Switch } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import { useTaskMetaForm } from 'features/TaskMeta/model/useTaskMetaForm';
import dayjs from 'dayjs';
import { CategorySelect } from 'entities/Category';

interface IProps {
	data: ITaskMeta | null;
	onChange: (meta: ITaskMeta) => void;
}

export function TaskMetaForm(props: IProps) {
	const { form } = useTaskMetaForm(props.onChange);

	return (
		<Form
			form={form}
			className={Styles.TaskMetaForm}
			labelAlign={'left'}
			wrapperCol={{
				flex: 1,
				style: {
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'flex-end',
				},
			}}
			labelCol={{ flex: 1 }}
		>
			<Form.Item name={'category'} label={'Категория'}>
				<CategorySelect
					onChange={(category) =>
						props.onChange({
							...props.data,
							category,
						})
					}
					category={props.data?.category}
				/>
			</Form.Item>
			<Form.Item name={'starts'} label={'Начало'}>
				<DatePicker
					value={dayjs(props.data?.deadline)}
					format={'YYYY.MM.DD'}
				/>
			</Form.Item>
			<Form.Item name={'deadline'} label={'Дэдлайн'}>
				<DatePicker
					value={dayjs(props.data?.deadline)}
					format={'YYYY.MM.DD'}
				/>
			</Form.Item>
			<Form.Item
				name={'highPriority'}
				label={'Высокий приоритет'}
				initialValue={false}
			>
				<Switch
					value={props.data?.highPriority}
					checkedChildren={<FireOutlined />}
				/>
			</Form.Item>
		</Form>
	);
}
