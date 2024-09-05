import { StepBox, useSteps } from 'entities/step';

import { BoardPageHeader } from './BoardPageHeader';
import { useTasksCards } from '../model/useTasksCards';

import Styles from './BoardPage.module.scss';

export function BoardPage() {
  const steps = useSteps();
  const { pending } = useTasksCards();

  return (
    <div className={Styles.BoardKanbanPage}>
      <BoardPageHeader />

      <div className={Styles.BoardSteps}>
        {steps.map((step) => (
          <StepBox key={step.id} step={step} isReady={!pending}>
            <></>
          </StepBox>
        ))}
      </div>
    </div>
  );
}
