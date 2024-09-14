import { Button, Tooltip } from 'antd';
import { stepColors, useSteps } from 'entities/step';
import { ITaskUsersInfo } from 'entities/task';
import { useTaskAccess } from 'features/TaskAccess';
import { motion } from 'framer-motion';
import { icons } from 'lucide-react';
import { MouseEventHandler, useCallback, useMemo } from 'react';
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
  const { steps } = useSteps();
  const { hasAccess } = useTaskAccess(taskUsersInfo);
  const Icon = icons[action.icon];

  const tooltipLabel = useMemo(() => {
    const label =
      action.label ?? steps.find((s) => s.id === action.toStepId)?.label;
    return label
      ? label.slice(0, 1).toUpperCase() + label.slice(1).toLowerCase()
      : undefined;
  }, [steps, action.toStepId, action.label]);

  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    (e) => {
      e.stopPropagation();
      if (action.onChoose) {
        action.onChoose(() => onAction(action.toStepId));
      } else {
        onAction(action.toStepId);
      }
    },
    [onAction, action],
  );

  if (action.hidden || !hasAccess(action.access)) {
    return <></>;
  }

  return (
    <motion.div key={action.key} {...appTransitions.scaleFull}>
      <Tooltip title={tooltipLabel} placement={'right'}>
        <Button
          type={'text'}
          icon={<Icon color={stepColors[action.toStepId]} />}
          onClick={handleClick}
        />
      </Tooltip>
    </motion.div>
  );
}
