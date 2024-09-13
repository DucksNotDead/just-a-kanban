import { App } from 'antd';
import { useCallback } from 'react';
import { appMessages } from 'shared/const';
import { usePending } from 'shared/utils/usePending';

type TConfirmFn = (onConfirm: () => Promise<any>) => void;

export function useDeleteConfirm(entity: string) {
  const { modal, message } = App.useApp();
  const [pending, setPending] = usePending(false);

  const handleConfirm = useCallback<TConfirmFn>((onConfirm) => {
    setPending(() => true);
    onConfirm()
      .catch(() => {
        void message.error(appMessages.toasts.delete.error);
      })
      .finally(() => setPending(() => false));
  }, []);

  const confirmDelete = useCallback<TConfirmFn>(
    (onConfirm) => {
      modal.confirm({
        title: `Удалить ${entity}?`,
        okText: 'Удалить',
        content: appMessages.confirm.delete,
        closable: !pending,
        okButtonProps: { danger: true, loading: pending },
        onOk: () => handleConfirm(onConfirm),
      });
    },
    [modal, entity, pending],
  );

  return { confirmDelete, deletePending: pending };
}
