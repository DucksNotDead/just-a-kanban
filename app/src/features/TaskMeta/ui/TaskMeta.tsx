import { ITaskMeta } from 'entities/task';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

import { TaskMetaForm } from './TaskMetaForm';
import { TaskMetaView } from './TaskMetaView';
import { taskMetaTransitionConfig } from '../config/taskMetaTransitionConfig';

interface IProps {
  editMode: boolean;
  task?: ITaskMeta;
  onChange: (meta: ITaskMeta) => void;
  onEditClick: () => void;
  onReadyChange: (isReady: boolean) => void;
  hasEditAccess: boolean;
}

const { editConditionMotionProps } = taskMetaTransitionConfig;

export function TaskMeta({
  editMode,
  task,
  onChange,
  onEditClick,
  onReadyChange,
  hasEditAccess,
}: IProps) {
  return (
    <LayoutGroup>
      <AnimatePresence mode={'wait'} initial={false}>
        {editMode ? (
          <motion.div {...editConditionMotionProps} key={'meta-edit'}>
            <TaskMetaForm
              onChange={onChange}
              onReadyChange={onReadyChange}
              data={task}
            />
          </motion.div>
        ) : (
          <motion.div {...editConditionMotionProps} key={'meta-view'}>
            {task && (
              <TaskMetaView
                taskMeta={task}
                onEditClick={onEditClick}
                hasEditAccess={hasEditAccess}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
