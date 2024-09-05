import { Tooltip } from 'antd';
import { IStep } from 'entities/step';
import { motion } from 'framer-motion';
import { ReactNode, useMemo } from 'react';
import { appTransitions } from 'shared/const';
import { useEnterAnimation } from 'shared/utils';

import { stepIcons } from '../model/const/stepIcons';

import Styles from './StepBox.module.scss';

interface IProps {
  step: IStep;
  isReady: boolean;
  children: ReactNode;
}

export function StepBox({ step: { id, name }, children, isReady }: IProps) {
  const shown = useEnterAnimation(Styles.Shown);
  const loading = useMemo(() => (!isReady ? Styles.Loading : ''), [isReady]);

  return (
    <div className={`${Styles.StepBox} ${shown} ${loading}`}>
      <div className={Styles.Content}>{children}</div>
      <div className={`${Styles.Header} ${!isReady ? Styles.Hidden : ''}`}>
        <Tooltip
          title={name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()}
        >
          {!isReady ? null : (
            <motion.div
              variants={appTransitions.scaleFull}
              initial={'hidden'}
              animate={'visible'}
            >
              {stepIcons[id - 1]}
            </motion.div>
          )}
        </Tooltip>
      </div>
    </div>
  );
}
