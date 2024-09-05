import { ITaskMetaForm } from 'entities/task';

export const taskMetaFormConfig: {
  name: keyof ITaskMetaForm;
  label?: string;
  date?: boolean;
  optional?: boolean
}[][] = [
  [{
    name: 'title',
  }],
  [{
    name: 'starts',
    label: 'Начало',
    optional: true,
    date: true,
  },
  {
    name: 'deadline',
    label: 'Дедлайн',
    date: true,
  }],
  [{
    name: 'responsible',
    label: 'Ответственный',
  },
  {
    name: 'slice',
    label: 'Слайс',
  }],
];
