import { SliceItem } from 'entities/slice';
import { ITaskMeta } from 'entities/task';
import { UserItem, useBoardUsers } from 'entities/user';
import { motion } from 'framer-motion';
import { CalendarArrowUp, CalendarClock } from 'lucide-react';
import { useMemo } from 'react';

import Styles from './TaskMetaView.module.scss';

interface IProps {
  taskMeta: ITaskMeta;
  onEditClick: () => void;
  hasEditAccess: boolean;
}

export function TaskMetaView({ taskMeta, onEditClick, hasEditAccess }: IProps) {
  const { getUser } = useBoardUsers();
  const user = useMemo(
    () => getUser(taskMeta.responsible),
    [getUser, taskMeta.responsible],
  );

  return (
    <motion.div
      className={Styles.TaskMeta}
      whileTap={hasEditAccess ? { scale: 0.95 } : undefined}
      onClick={hasEditAccess ? onEditClick : undefined}
    >
      <div className={Styles.TaskMetaLeft}>
        <div className={Styles.TaskMetaTags}>
          <SliceItem id={taskMeta.slice} />
          <UserItem avatar={user?.avatar} name={user?.name} />
        </div>
        <h2>{taskMeta.title}</h2>
      </div>
      <div className={Styles.TaskMetaRight}>
        {taskMeta.starts && (
          <div className={Styles.TaskMetaDate}>
            <CalendarArrowUp /> {taskMeta.starts}
          </div>
        )}
        <div className={Styles.TaskMetaDate}>
          <CalendarClock /> {taskMeta.deadline}
        </div>
      </div>
      {hasEditAccess && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className={Styles.TaskMetaEditMask}
        >
          Изменить
        </motion.div>
      )}
    </motion.div>
  );
}
