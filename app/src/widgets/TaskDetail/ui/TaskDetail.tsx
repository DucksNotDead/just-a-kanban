import { Modal } from 'antd';
import { ITask, ITaskMeta } from 'entities/task';
import { ITodo } from 'entities/todo';
import { TaskMeta } from 'features/TaskMeta';
import { TodoList } from 'features/TodoList';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import { taskDetailTransitionConfig } from '../config/taskDetailTransitionConfig';
import { TEditMode } from '../model/types/taskDetailTypes';
import { useTaskAccess } from '../model/useTaskAccess';
import { useTaskDetailFooterButtons } from '../model/useTaskDetailFooterButtons';

import Styles from './TaskDetail.module.scss';

export interface ITaskDetailRef {
  open: (task: ITask | null) => void;
}

const { todosMotionProps } = taskDetailTransitionConfig;

export const TaskDetail = forwardRef<ITaskDetailRef>((_, ref) => {
  const { access, accessPending } = useTaskAccess();
  const [taskMeta, setTaskMeta] = useState<ITaskMeta | null>(null);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todosPending, setTodosPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState<TEditMode>(null);
  const [createMode, setCreateMode] = useState(false);
  const [metaReady, setMetaReady] = useState(false);

  const open = useCallback((entry: ITask | null) => {
    setIsOpen(() => true);
    if (!entry) {
      setEditMode(() => 'meta');
      setCreateMode(() => true);
    } else {
      setTaskMeta(() => entry);
    }
  }, []);

  const handleMetaSave = useCallback(() => {
    setCreateMode(() => false);
  }, [taskMeta]);

  const handleTodosSave = useCallback(() => {
    setCreateMode(() => false);
  }, [todos]);

  const handleDialogCancel = useCallback(() => {
    setIsOpen(() => false)
    setEditMode(() => null)
    setTaskMeta(() => null)
    setMetaReady(() => false)
    setCreateMode(() => false)
    setTodos(() => [])
    setTodosPending(() => false)
  }, []);

  useImperativeHandle(ref, () => ({ open }));

  const footerButtons = useTaskDetailFooterButtons({
    editMode,
    createMode,
    metaReady,
    setEditMode,
    setIsOpen,
    onTodosSave: handleTodosSave,
    onMetaSave: handleMetaSave,
  });

  return (
    <Modal
      width={600}
      open={isOpen}
      onCancel={handleDialogCancel}
      closable={false}
      className={Styles.TaskDetail}
      destroyOnClose
      footer={footerButtons}
      loading={accessPending}
    >
      <motion.div layout={'size'} className={Styles.TaskDetailContent}>
        <LayoutGroup>
          <TaskMeta
            editMode={editMode === 'meta'}
            task={taskMeta ?? undefined}
            onChange={setTaskMeta}
            onReadyChange={setMetaReady}
            onEditClick={() => setEditMode(() => 'meta')}
          />
          <AnimatePresence mode={'wait'} initial={false}>
            {!!(editMode ? editMode !== 'meta' : todos[0]?.label.length) && (
              <motion.div key={'task-detail-todos'} {...todosMotionProps}>
                <TodoList
                  value={todos}
                  onChange={setTodos}
                  loading={todosPending}
                  editMode={editMode === 'todos'}
                  toggleAccess={createMode ? false : !!access?.isResponsible}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </motion.div>
    </Modal>
  );
});
