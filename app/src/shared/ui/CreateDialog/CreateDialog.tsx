import { Modal } from 'antd';
import {
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { IModalRef } from 'shared/types';

interface IProps {
  onConfirm: () => void;
  onClose?: () => void;
  children: ReactNode;
  entity: string;
  loading?: boolean;
  disabled?: boolean;
  classname?: string;
}

export const CreateDialog = forwardRef<IModalRef, IProps>(
  (
    {
      onConfirm,
      entity,
      children,
      loading,
      disabled,
      classname,
      onClose,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    const handleClose = useCallback(() => {
      onClose && onClose();
      !loading && setOpen(() => false);
    }, [onClose, loading]);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(() => true),
      close: () => setOpen(() => false),
      isOpen: open,
    }));

    return (
      <Modal
        open={open}
        onCancel={handleClose}
        title={'Создать ' + entity}
        onOk={onConfirm}
        destroyOnClose={true}
        okButtonProps={{ disabled, loading }}
        okText={'Создать'}
        className={classname}
      >
        {children}
      </Modal>
    );
  },
);
