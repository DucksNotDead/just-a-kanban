import { forwardRef, useCallback } from 'react';
import { Modal } from 'antd';
import Styles from './TaskModal.module.scss';
import { MODAL_WIDTH } from '../model/const';
import { ITaskModalProps, ITaskModalRef } from '../model/types';
import { TaskModalBody } from './TaskModalBody';
import { TaskModalSidebar } from './TaskModalSidebar';
import { useTaskUpdate } from '../model/useTaskUpdate';
import { useTaskModal } from '../model/useTaskModal';

export const TaskModal = forwardRef<ITaskModalRef, ITaskModalProps>(
	(props, ref) => {
		const {
			task,
			open,
			mode,
			loading,
			setTask,
			toViewMode,
			toEditMode,
			handleCancel,
		} = useTaskModal(props, ref);

		const { handleSave, updateTitle,  updateBody, updateMeta, saving } = useTaskUpdate(
			task,
			setTask,
		);

		const handleSidebarCancel = useCallback(() => {
			if (mode !== 'create') toViewMode();
			else handleCancel();
		}, [mode]);

		return (
			<Modal
				destroyOnClose={true}
				open={open}
				onCancel={handleCancel}
				closable={false}
				loading={loading}
				width={MODAL_WIDTH}
				classNames={{
					content: Styles.ModalContent,
					body: Styles.ModalBody,
					header: Styles.Hidden,
					footer: Styles.Hidden,
				}}
			>
				<TaskModalBody
					viewMode={!mode}
					data={task}
					onTitleChange={updateTitle}
					onBodyChange={updateBody}
				/>
				<TaskModalSidebar
					isOpen={!!mode}
					data={task}
					onChange={updateMeta}
					onSave={handleSave}
					onCancel={handleSidebarCancel}
					saving={saving}
				/>
			</Modal>
		);
	},
);
