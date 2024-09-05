import { Button } from 'antd';
import { useMemo } from 'react';

import { TEditMode } from './types/taskDetailTypes';

interface IPrimaryButtonProps {
  label: string;
  callback: () => void;
  disabled?: boolean;
}

export function useTaskDetailFooterButtons({
  editMode,
  setEditMode,
  setIsOpen,
  onTodosSave,
  onMetaSave,
  metaReady,
  createMode,
}: {
  editMode: TEditMode;
  setEditMode: (mode: TEditMode) => void;
  setIsOpen: (open: boolean) => void;
  onTodosSave: () => void;
  onMetaSave: () => void;
  metaReady: boolean;
  createMode: boolean;
}) {
  const primaryButtonProps = useMemo<IPrimaryButtonProps>(() => {
    switch (editMode) {
      case null: {
        return {
          label: 'Редактировать',
          callback: () => setEditMode('todos'),
        };
      }
      case 'todos': {
        return {
          label: 'Сохранить',
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
            onMetaSave();
          },
        };
      }
    }
  }, [editMode, setEditMode, onTodosSave, onMetaSave, metaReady, createMode]);

  return useMemo(
    () => [
      <Button key={'close-button'} onClick={() => setIsOpen(false)}>
        Отмена
      </Button>,
      <Button
        key={'save-edit-button'}
        type={'primary'}
        disabled={primaryButtonProps.disabled}
        onClick={primaryButtonProps.callback}
      >
        {primaryButtonProps.label}
      </Button>,
    ],
    [primaryButtonProps, setIsOpen, setEditMode],
  );
}
