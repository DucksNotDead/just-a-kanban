import { ITaskMeta } from 'entities/Task';
import { Dayjs } from 'dayjs';

export interface ITaskMetaFormFields extends Omit<ITaskMeta, 'starts'|'deadline'>{
	starts: Dayjs;
	deadline: Dayjs;
}