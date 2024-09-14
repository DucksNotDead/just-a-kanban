import { Progress } from 'antd';
import { useSlices } from 'entities/slice';
import { useTasksApi } from 'entities/task';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useCallback, useMemo } from 'react';
import { appTransitions } from 'shared/const';
import { toFixedName } from 'shared/utils';
import { ITaskCard } from 'widgets/TaskCard';
import { TaskCardMetaInfo } from 'widgets/TaskCard/ui/TaskCardMetaInfo';

import { TaskCardStepAction } from './TaskCardStepAction';
import { getTaskCardStepActionsConfig } from '../config/getTaskCardStepActionsConfig';

import Styles from './TaskCard.module.scss';

interface IProps extends ITaskCard {
  index: number;
  control: ReactNode;
  onClick: (taskId: number) => void;
  onStepChangeClick: (taskId: number, stepId: number) => void;
}

export function TaskCard({
  task,
  control,
  status,
  onClick,
  onStepChangeClick,
}: IProps) {
  const tasksApi = useTasksApi();
  const { slices } = useSlices();

  const handleReviewerChange = useCallback(() => {
    void tasksApi.setReviewer(task.id);
  }, [task.id]);

  const sliceColor = useMemo(() => {
    return slices.find((s) => s.id === task.slice)?.color;
  }, [slices, task]);

  const ghostStyle = useMemo(() => {
    return status === 'ghost' ? Styles.Hidden : Styles.Visible;
  }, [status]);

  const actions = useMemo(() => {
    return getTaskCardStepActionsConfig(
      task.doneTodosCount === task.todosCount || task.todosCount === 0,
      !!task.reviewer,
      handleReviewerChange,
    );
  }, [
    task.todosCount,
    task.doneTodosCount,
    task.reviewer,
    handleReviewerChange,
  ]);

  const todosPercent = useMemo(() => {
    const { todosCount, doneTodosCount, step } = task;
    const percent = (doneTodosCount / todosCount) * 100;
    const percentWithConditions =
      todosCount === 0 ? (step === 1 ? 0 : 100) : percent;
    return percentWithConditions > 3 ? percentWithConditions : 3;
  }, [task.todosCount, task.doneTodosCount, task.step]);

  return (
    <motion.div
      key={task.id}
      className={`${Styles.TaskCard} ${status === 'ghost' ? Styles.Loading : ''}`}
      {...appTransitions.scaleFull}
      whileTap={appTransitions.scale.variants.hidden}
      onClick={() => onClick(task.id)}
    >
      <TaskCardMetaInfo
        responsibleId={task.responsible}
        reviewerId={task.reviewer}
        stepId={task.step}
        color={sliceColor}
      />
      {control}
      <div className={`${Styles.TaskCardMain} ${ghostStyle}`}>
        <h3>{toFixedName(task.title, 40)}</h3>
        <Progress
          showInfo={false}
          percent={todosPercent}
          status={task.step === 2 ? 'active' : 'normal'}
          strokeColor={sliceColor}
          size={'small'}
        />
      </div>
      <motion.div className={`${Styles.TaskCardActions} ${ghostStyle}`}>
        <AnimatePresence>
          {actions[task.step].map((action) => (
            <TaskCardStepAction
              key={action.key}
              action={action}
              onAction={(stepId) => onStepChangeClick(task.id, stepId)}
              taskUsersInfo={{
                responsible: task.responsible,
                reviewer: task.reviewer,
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
