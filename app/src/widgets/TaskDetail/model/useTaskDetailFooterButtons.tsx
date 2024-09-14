import { Badge, Button } from 'antd';
import { useMemo } from 'react';
import { AnimatedList } from 'shared/ui';
import { useDeleteConfirm } from 'shared/utils';

import { TEditMode } from './types/taskDetailTypes';
import Styles from '../ui/TaskDetail.module.scss';

interface IPrimaryButtonProps {
  label: string;
  callback: () => void;
  disabled?: boolean;
}

interface IActionButton extends IPrimaryButtonProps {
  key: string;
  visible: boolean;
  type?: 'danger' | 'default';
}

export function useTaskDetailFooterButtons({
  hasEditAccess,
  hasReviewer,
  hasReviewerAccess,
  editMode,
  todosChanged,
  setEditMode,
  onCancel,
  onTodosSave,
  onMetaSave,
  onTaskDelete,
  metaReady,
  createMode,
  todosReady,
}: {
  hasEditAccess: boolean;
  hasReviewer: boolean;
  hasReviewerAccess: boolean;
  todosReady: boolean;
  editMode: TEditMode;
  todosChanged: boolean;
  setEditMode: (mode: TEditMode) => void;
  onCancel: () => void;
  onTodosSave: () => void;
  onMetaSave: () => void;
  onTaskDelete: () => Promise<void>;
  metaReady: boolean;
  createMode: boolean;
}) {
  const { confirmDelete } = useDeleteConfirm('задачу');

  const primaryButtonProps = useMemo<IPrimaryButtonProps>(() => {
    switch (editMode) {
      case null: {
        return {
          label: 'Редактировать',
          callback: () => setEditMode('todos'),
          disabled: !todosReady,
        };
      }
      case 'todos': {
        return {
          label: 'Сохранить',
          disabled: !createMode ? !todosChanged : false,
          callback: () => {
            setEditMode(null);
            onTodosSave();
          },
        };
      }
      case 'meta': {
        return {
          label: createMode ? 'Далее' : 'Coхранить',
          disabled: !metaReady,
          callback: () => {
            setEditMode(createMode ? 'todos' : null);
            !createMode && onMetaSave();
          },
        };
      }
    }
  }, [
    todosReady,
    editMode,
    setEditMode,
    onTodosSave,
    onMetaSave,
    metaReady,
    createMode,
    todosChanged,
  ]);

  const actionButtons = useMemo<IActionButton[]>(() => {
    return [
      {
        key: 'delete-button',
        label: 'Удалить',
        visible: hasEditAccess && !createMode && !editMode,
        type: 'danger',
        callback: () => confirmDelete(onTaskDelete),
      },
      {
        key: 'primary-button',
        visible: hasReviewer ? hasReviewerAccess : hasEditAccess || createMode,
        ...primaryButtonProps,
      },
      {
        key: 'comments-button',
        label: 'Комментарии',
        visible: !createMode && !editMode,
        type: 'default',
        callback: () => {},
      },
    ];
  }, [
    hasEditAccess,
    hasReviewer,
    hasReviewerAccess,
    editMode,
    createMode,
    primaryButtonProps,
    onTaskDelete,
  ]);

  return useMemo(
    () => [
      <Button
        key={'close-button'}
        onClick={() =>
          !editMode || createMode ? onCancel() : setEditMode(null)
        }
      >
        {editMode ? 'Отмена' : 'Закрыть'}
      </Button>,
      <AnimatedList
        key={'action-buttons-list'}
        dataSource={actionButtons}
        keyProp={'key'}
        className={Styles.TaskDetailFooterButtons}
        renderItem={(item) =>
          item.visible && (
            <Badge>
              <Button
                disabled={item.disabled}
                danger={item.type === 'danger'}
                type={item.type === 'default' ? 'default' : 'primary'}
                onClick={item.callback}
              >
                {item.label}
              </Button>
            </Badge>
          )
        }
      />,
    ],
    [createMode, editMode, onCancel, setEditMode, actionButtons],
  );
}
