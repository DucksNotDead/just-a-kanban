import { App, Button } from 'antd';
import {
  ISlice,
  ISliceCreateRequest,
  SliceItem,
  useSlices,
} from 'entities/slice';
import { SliceCreateDialog } from 'entities/slice/ui/SliceCreateDialog';
import { Delete } from 'lucide-react';
import { MouseEvent, useCallback, useRef, useState } from 'react';
import { appMessages } from 'shared/const';
import { IModalRef } from 'shared/types';
import { Select } from 'shared/ui';

import Styles from './SliceSelect.module.scss';

interface IProps {
  value?: number;
  onChange: (slice: ISlice | null) => void;
  editMode?: boolean;
  filled?: boolean;
}

export function SliceSelect({ value, onChange, editMode, filled }: IProps) {
  const { slices, slicesPending, createSlice, deleteSlice } = useSlices();
  const { modal } = App.useApp();
  const [actionPending, setActionPending] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const createDialogRef = useRef<IModalRef>(null);

  const getSlice = useCallback(
    (id: number) => {
      return slices.find((s) => s.id === id) ?? null;
    },
    [slices],
  );

  const handleChange = useCallback(
    (ids: number[]) => {
      onChange(getSlice(ids[0]));
      setSelectedId(() => ids[0] ?? null);
    },
    [getSlice],
  );

  const handleRemoveClick = useCallback(
    (e: MouseEvent<HTMLElement, globalThis.MouseEvent>, id: number) => {
      e.stopPropagation();
      const slice = getSlice(id);
      if (slice) {
        modal.confirm({
          title: 'Удалить ' + slice.name + '?',
          content: appMessages.confirm.delete,
          closable: !actionPending,
          okText: 'Удалить',
          okButtonProps: { danger: true, loading: actionPending },
          onOk: () => handleRemoveConfirm(id),
        });
      }
    },
    [getSlice],
  );

  const handleRemoveConfirm = useCallback(
    (id: number) => {
      setActionPending(() => true);
      deleteSlice(id).finally(() => setActionPending(() => false));
    },
    [deleteSlice],
  );

  const handleCreateClick = useCallback(() => {
    createDialogRef.current?.open();
  }, []);

  const handleCreateConfirm = useCallback(
    (createDto: ISliceCreateRequest) => {
      createSlice(createDto)
        ?.then(() => {
          createDialogRef.current?.close();
        })
        .finally(() => setActionPending(() => false));
    },
    [createSlice],
  );

  const renderOption = useCallback(
    (id: number) => (
      <SliceItem
        id={id}
        postfix={
          id === selectedId || !editMode ? null : (
            <div className={Styles.SliceDelete}>
              <Button
                onClick={(e) => handleRemoveClick(e, id)}
                size={'small'}
                type={'text'}
                icon={<Delete />}
              />
            </div>
          )
        }
      />
    ),
    [slices, selectedId],
  );

  return (
    <>
      <Select
        value={value ? [value] : undefined}
        filled={filled}
        data={slices.map((slice) => ({
          label: slice.name,
          value: slice.id,
        }))}
        entity={'слайс'}
        onChange={handleChange}
        pending={slicesPending}
        renderOption={renderOption}
        menuHeader={
          <Button onClick={handleCreateClick} style={{ width: '100%' }}>
            Добавить слайс
          </Button>
        }
      />
      <SliceCreateDialog
        ref={createDialogRef}
        onConfirm={handleCreateConfirm}
        pending={actionPending}
      />
    </>
  );
}
