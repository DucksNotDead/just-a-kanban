import { TStep, stepColors } from 'entities/step';
import { UserAvatar, useBoardUsers } from 'entities/user';
import { AnimatePresence, motion } from 'framer-motion';
import { Shield, ShieldCheck } from 'lucide-react';
import { useMemo } from 'react';
import { appTransitions } from 'shared/const';

import Styles from './TaskCardMetaInfo.module.scss';

interface IProps {
  responsibleId: number;
  reviewerId: number | null;
  stepId: TStep;
  color: string | undefined;
}

export function TaskCardMetaInfo({
  responsibleId,
  reviewerId,
  stepId,
  color,
}: IProps) {
  const { getUser } = useBoardUsers();

  const reviewer = useMemo(() => {
    return reviewerId ? getUser(reviewerId) : undefined;
  }, [reviewerId, getUser]);

  return (
    <div className={Styles.TaskCardMetaInfo}>
      <div
        className={Styles.TaskCardMetaInfoItem}
        style={{ backgroundColor: color }}
      >
        <UserAvatar avatar={getUser(responsibleId)?.avatar} size={'small'} />
      </div>

      <AnimatePresence>
        {reviewer && (
          <motion.div
            {...appTransitions.scaleFull}
            className={`${Styles.TaskCardMetaInfoItem} ${Styles.Reviewer}`}
            style={{ backgroundColor: stepColors[stepId] }}
          >
            {reviewer.username}
            {stepId === 4 ? <ShieldCheck /> : <Shield />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
