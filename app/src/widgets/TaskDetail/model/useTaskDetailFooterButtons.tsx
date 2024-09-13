import { Button, Space } from 'antd';
import { useMemo } from 'react';
import { useDeleteConfirm } from 'shared/utils';

import { TEditMode } from './types/taskDetailTypes';

interface IPrimaryButtonProps {
  label: string;
  callback: () => void;
  disabled?: boolean;
}

export function useTaskDetailFooterButtons({
  hasEditAccess,
  editMode,
  todosChanged,
  setEditMode,
  onCancel,
  onTodosSave,
  onMetaSave,
  onTaskDelete,
  metaReady,
  createMode,
  loading,
  todosReady,
}: {
  hasEditAccess: boolean;
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
  loading: boolean;
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
          disabled: !todosChanged,
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

  return useMemo(
    () => [
      <Button
        key={'close-button'}
        onClick={() => (editMode ? setEditMode(null) : onCancel())}
      >
        {editMode ? 'Отмена' : 'Закрыть'}
      </Button>,
      ...(hasEditAccess || createMode
        ? [
            <Space key={'edit-buttons'}>
              {!createMode && !editMode && (
                <Button
                  danger
                  key={'delete-button'}
                  type={'primary'}
                  onClick={() => confirmDelete(onTaskDelete)}
                >
                  Удалить
                </Button>
              )}
              <Button
                key={'save-edit-button'}
                type={'primary'}
                disabled={primaryButtonProps.disabled}
                onClick={primaryButtonProps.callback}
                loading={loading}
              >
                {primaryButtonProps.label}
              </Button>
            </Space>,
          ]
        : []),
    ],
    [
      primaryButtonProps,
      setEditMode,
      hasEditAccess,
      createMode,
      editMode,
      onCancel,
    ],
  );
}
