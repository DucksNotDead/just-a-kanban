import { App, Modal, Skeleton } from 'antd';
import { useBoard } from 'entities/board';
import { TStep, stepColors, useSteps } from 'entities/step';
import {
  ITaskFull,
  ITaskMeta,
  ITaskUsersInfo,
  useTasksApi,
} from 'entities/task';
import { ITodo, useTodosApi } from 'entities/todo';
import { useTaskAccess } from 'features/TaskAccess';
import { TaskMeta } from 'features/TaskMeta';
import { TodoList } from 'features/TodoList';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { appMessages } from 'shared/const';
import { usePending } from 'shared/utils';

import { taskDetailTransitionConfig } from '../config/taskDetailTransitionConfig';
import { TEditMode } from '../model/types/taskDetailTypes';
import { useTaskDetailFooterButtons } from '../model/useTaskDetailFooterButtons';
import { useTaskDetailTodosSocket } from '../model/useTaskDetailTodosSocket';
import { useTaskDetailUsersInfoSocket } from '../model/useTaskDetailUsersInfoSocket';

import Styles from './TaskDetail.module.scss';

export interface ITaskDetailRef {
  open: (task: ITaskFull | null) => void;
}

const { todosMotionProps } = taskDetailTransitionConfig;

const todosFilterFn = (todo: ITodo) => todo.label.trim().length;

export const TaskDetail = forwardRef<ITaskDetailRef>((_, ref) => {
  const todosApi = useTodosApi();
  const tasksApi = useTasksApi();
  const { steps } = useSteps();
  const { board } = useBoard();
  const { message } = App.useApp();
  const [taskMeta, setTaskMeta] = useState<ITaskMeta | null>(null);
  const [taskStepId, setTaskStepId] = useState<TStep | null>(null);
  const [taskUsersInfo, setTaskUsersInfo] = useState<ITaskUsersInfo | null>(
    null,
  );
  const [taskId, setTaskId] = useState<number | null>(null);
  const [updatePending, setUpdatePending] = usePending(false);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [savedTodos, setSavedTodos] = useState<ITodo[]>([]);
  const [todosReadyPending, setTodosReadyPending] = usePending(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState<TEditMode>(null);
  const [createMode, setCreateMode] = useState(false);
  const [metaReady, setMetaReady] = useState(false);

  const { hasAccess, hasAnyAccess } = useTaskAccess(taskUsersInfo);

  const hasEditAccess = useMemo(() => {
    return hasAccess('manager') || createMode;
  }, [hasAccess]);

  const todosChanged = useMemo(() => {
    const fn = (todo: ITodo) => todo.label.trim().length;
    if (todos.filter(fn).length !== savedTodos.filter(fn).length) {
      return true;
    }

    for (const index in todos) {
      const savedItem = savedTodos[index];
      const newItem = todos[index];

      if (
        newItem?.label.trim().length &&
        (savedItem?.id !== newItem?.id || savedItem?.label !== newItem?.label)
      ) {
        return true;
      }
    }
    return false;
  }, [todos, savedTodos]);

  const open = useCallback((entry: ITaskFull | null) => {
    setIsOpen(() => true);
    if (!entry) {
      setEditMode(() => 'meta');
      setCreateMode(() => true);
    } else {
      setTodosReadyPending(() => true);
      todosApi
        .get(entry.id)
        .then((data) => setSavedTodos(() => data ?? []))
        .finally(() => setTodosReadyPending(() => false));

      setTaskMeta(() => entry);
      setTaskId(() => entry.id);
      setTaskStepId(() => entry.step);
      setTaskUsersInfo(() => ({
        responsible: entry.responsible,
        reviewer: entry.reviewer,
      }));
    }
  }, []);

  const handleTaskDelete = useCallback(async () => {
    await tasksApi.delete(taskId!);
    handleDialogCancel();
  }, [taskId]);

  const handleMetaSave = useCallback(async () => {
    setUpdatePending(() => true);
    tasksApi
      .changeMeta(taskId!, taskMeta!)
      .finally(() => setUpdatePending(() => false));
  }, [taskMeta]);

  const handleTodosSave = useCallback(async () => {
    setUpdatePending(() => true);

    try {
      let id: number | null = taskId;

      if (createMode && taskMeta) {
        id = await tasksApi.create(board?.slug!, taskMeta);
        setTaskId(() => id);
        setCreateMode(() => false);
      }

      if (id) {
        todosApi
          .change(id, { todos: todos.filter(todosFilterFn) })
          .finally(() => setUpdatePending(() => false));
      }
    } catch {
      message.error(appMessages.toasts.create.error);
    } finally {
      setUpdatePending(() => false);
      if (createMode) {
        handleDialogCancel();
      }
    }
  }, [taskMeta, taskId, todos, createMode, board]);

  const handleDialogCancel = useCallback(() => {
    setIsOpen(() => false);
    setEditMode(() => null);
    setTaskMeta(() => null);
    setTaskId(() => null);
    setTaskUsersInfo(() => null);
    setTaskStepId(() => null);
    setMetaReady(() => false);
    setCreateMode(() => false);
    setSavedTodos(() => []);
  }, []);

  useTaskDetailTodosSocket(taskId, setSavedTodos, setTodosReadyPending);

  useTaskDetailUsersInfoSocket(taskId, setTaskUsersInfo);

  useImperativeHandle(ref, () => ({ open }));

  useEffect(() => {
    setTodos(() => savedTodos.map((todo) => ({ ...todo })));
  }, [savedTodos]);

  useEffect(() => {
    if (editMode === null) {
      setTodos((prevState) => prevState.filter(todosFilterFn));
    }
  }, [editMode]);

  const footerButtons = useTaskDetailFooterButtons({
    editMode,
    createMode,
    metaReady,
    setEditMode,
    hasEditAccess,
    todosChanged,
    hasReviewer: !!taskUsersInfo?.reviewer,
    hasReviewerAccess: hasAccess('reviewer'),
    todosReady: !todosReadyPending,
    onCancel: handleDialogCancel,
    onTodosSave: handleTodosSave,
    onMetaSave: handleMetaSave,
    onTaskDelete: handleTaskDelete,
  });

  return (
    <Modal
      destroyOnClose
      width={760}
      open={isOpen}
      onCancel={handleDialogCancel}
      onClose={handleDialogCancel}
      closable={false}
      className={Styles.TaskDetail}
      footer={footerButtons}
      modalRender={(node) => {
        const step = steps.find((s) => s.id === taskStepId);
        return (
          <>
            {node}
            <div
              className={Styles.TaskDetailStepBadge}
              style={{ backgroundColor: step && stepColors[step.id] }}
            >
              {step?.name}
            </div>
          </>
        );
      }}
    >
      <motion.div layout={'size'} className={Styles.TaskDetailContent}>
        <LayoutGroup>
          <TaskMeta
            editMode={editMode === 'meta'}
            task={taskMeta ?? undefined}
            onChange={setTaskMeta}
            onReadyChange={setMetaReady}
            onEditClick={() => setEditMode(() => 'meta')}
            hasEditAccess={hasEditAccess}
          />
          <AnimatePresence mode={'wait'}>
            {!editMode || editMode !== 'meta' ? (
              todosReadyPending ? (
                <motion.div
                  key={'task-detail-todos-skeleton'}
                  {...todosMotionProps}
                >
                  <Skeleton title={false} paragraph={{ rows: 3 }} />
                </motion.div>
              ) : (
                <motion.div key={'task-detail-todos'} {...todosMotionProps}>
                  <TodoList
                    taskId={taskId}
                    value={todos}
                    onChange={(todos) => setTodos(() => todos)}
                    editMode={editMode === 'todos'}
                    toggleAccess={
                      !createMode &&
                      hasAnyAccess(['responsible', 'reviewer']) &&
                      !!taskStepId &&
                      [2, 3].includes(taskStepId)
                    }
                  />
                </motion.div>
              )
            ) : undefined}
          </AnimatePresence>
        </LayoutGroup>
      </motion.div>
    </Modal>
  );
});
