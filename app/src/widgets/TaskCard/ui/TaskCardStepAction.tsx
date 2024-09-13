import { Button } from 'antd';
import { stepColors } from 'entities/step';
import { ITaskUsersInfo } from 'entities/task';
import { useTaskAccess } from 'features/TaskAccess';
import { motion } from 'framer-motion';
import { icons } from 'lucide-react';
import { useCallback } from 'react';
import { appTransitions } from 'shared/const';
import { ITaskCardStepAction } from 'widgets/TaskCard';

interface IProps {
  action: ITaskCardStepAction;
  taskUsersInfo: ITaskUsersInfo;
  onAction: (stepId: number) => void;
}

export function TaskCardStepAction({
  action,
  taskUsersInfo,
  onAction,
}: IProps) {
  const { hasAccess } = useTaskAccess(taskUsersInfo);
  const Icon = icons[action.icon];

  const handleClick = useCallback(() => {
    if (action.onChoose) {
      action.onChoose(() => onAction(action.toStepId));
    } else {
      onAction(action.toStepId);
    }
  }, [onAction, action]);

  if (action.hidden || !hasAccess(action.access)) {
    return <></>;
  }

  return (
    <motion.div key={action.key} {...appTransitions.scaleFull}>
      <Button
        type={'text'}
        icon={<Icon color={stepColors[action.toStepId]} />}
        onClick={handleClick}
      />
    </motion.div>
  );
}
