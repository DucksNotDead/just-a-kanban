import { ColorPicker, Form, Input } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import { ISliceCreateRequest } from 'entities/slice';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { appMessages } from 'shared/const';
import { IModalRef } from 'shared/types';
import { CreateDialog } from 'shared/ui';
import { useFormReady } from 'shared/utils';

import { getRandomSliceColor } from '../lib/getRandomSliceColor';
import { getRandomSliceName } from '../lib/getRandomSliceName';
import { defaultSliceColors } from '../model/const/sliceConst';

import Styles from './SliceCreateDialog.module.scss';

interface IProps {
  onConfirm: (dto: ISliceCreateRequest) => void;
  pending: boolean;
}

export const SliceCreateDialog = forwardRef<IModalRef, IProps>(
  ({ onConfirm, pending }, ref) => {
    const dialogRef = useRef<IModalRef>(null);
    const [isReady, setIsReady] = useState(false);
    const [form] = useForm<ISliceCreateRequest>();
    const createDto = useWatch([], form);

    useImperativeHandle(ref, () => ({
      open: dialogRef.current?.open ?? (() => {}),
      close: dialogRef.current?.close ?? (() => {}),
      isOpen: !!dialogRef.current?.isOpen,
    }));

    useFormReady(form, createDto, setIsReady);

    useEffect(() => {
      dialogRef.current?.isOpen &&
        form.setFieldValue('name', getRandomSliceName());
      form.setFieldValue('color', getRandomSliceColor());
    }, [form, dialogRef.current?.isOpen]);

    return (
      <CreateDialog
        ref={dialogRef}
        onConfirm={() => onConfirm(createDto)}
        entity={'слайс'}
        disabled={!isReady}
        loading={pending}
      >
        <Form
          form={form}
          layout={'vertical'}
          className={Styles.SliceCreateForm}
        >
          <Form.Item
            name={'name'}
            rules={[
              { required: true, message: appMessages.validation.required },
            ]}
          >
            <Input placeholder={'название'} />
          </Form.Item>
          <Form.Item
            name={'color'}
            required={true}
            getValueFromEvent={(_, color) => color}
          >
            <ColorPicker
              placement={'right'}
              trigger={'hover'}
              disabledAlpha={true}
              presets={[{ label: 'готовые', colors: defaultSliceColors }]}
            />
          </Form.Item>
        </Form>
      </CreateDialog>
    );
  },
);
