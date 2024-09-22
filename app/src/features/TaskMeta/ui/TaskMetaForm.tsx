import { Flex, Form, Input } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import { Dayjs } from 'dayjs';
import { ISlice, SliceSelect } from 'entities/slice';
import { ITaskMeta, ITaskMetaForm } from 'entities/task';
import { IUser, UserSelect } from 'entities/user';
import { useCallback, useEffect, useState } from 'react';
import { appMessages } from 'shared/const';
import { DateTimePicker } from 'shared/ui';
import { dateToString, stringToDate, useFormReady } from 'shared/utils';

import { taskMetaFormConfig } from '../config/taskMetaFormConfig';

import Style from './TaskMetaForm.module.scss';

interface IProps {
  data?: ITaskMeta;
  onChange: (data: ITaskMeta) => void;
  onReadyChange: (isReady: boolean) => void;
}

export function TaskMetaForm({ data, onChange, onReadyChange }: IProps) {
  const [form] = useForm<ITaskMetaForm>();
  const [isReady, setIsReady] = useState(false);

  const value = useWatch([], form);

  const handleResponsibleChange = useCallback(
    (responsible: IUser[]) => {
      form.setFieldValue('responsible', responsible[0]?.id);
    },
    [form],
  );

  const handleSliceChange = useCallback(
    (slice: ISlice | null) => {
      form?.setFieldValue('slice', slice?.id);
    },
    [form],
  );

  const handleDateChange = useCallback(
    (dayjs: Dayjs, field: keyof ITaskMetaForm) => {
      form.setFieldValue(field, dayjs);
    },
    [form],
  );

  useEffect(() => {
    if (data) {
      for (const field in data) {
        const value = data[field as keyof typeof data];
        form.setFieldValue(
          field as keyof typeof data,
          ['starts', 'deadline'].includes(field) && typeof value === 'string'
            ? stringToDate(value as string)
            : value,
        );
      }
    }
  }, [data]);

  useFormReady(form, value, setIsReady);

  useEffect(() => {
    if (isReady) {
      onChange({
        ...value,
        starts: value.starts && dateToString(value.starts),
        deadline: dateToString(value.deadline),
      });
    }
  }, [isReady, onChange, value]);

  useEffect(() => {
    onReadyChange(isReady);
  }, [isReady]);

  return (
    <Form className={Style.TaskMetaForm} form={form} layout={'vertical'}>
      {taskMetaFormConfig.map((row, index) => (
        <Flex key={index} gap={12} align={'start'}>
          {row.map((field) => (
            <Form.Item
              key={field.name}
              className={Style.TaskMetaFormItem}
              name={field.name}
              label={field.label}
              rules={[
                {
                  required: !field.optional,
                  message: appMessages.validation.required,
                },
              ]}
            >
              {field.date ? (
                <DateTimePicker
                  value={value?.[field.name] as Dayjs | undefined}
                  onChange={(dayjs) => handleDateChange(dayjs, field.name)}
                  min={
                    field.name === 'deadline' && value
                      ? value.starts
                      : undefined
                  }
                />
              ) : field.name === 'responsible' ? (
                <UserSelect
                  value={value && [value[field.name]]}
                  onChange={handleResponsibleChange}
                />
              ) : field.name === 'slice' ? (
                <SliceSelect
                  value={value?.[field.name]}
                  onChange={handleSliceChange}
                />
              ) : (
                <Input placeholder={'Название'} maxLength={60}/>
              )}
            </Form.Item>
          ))}
        </Flex>
      ))}
    </Form>
  );
}
