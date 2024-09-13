import { useBoard } from 'entities/board';
import { StepBox, useSteps } from 'entities/step';
import { AnimatedList } from 'shared/ui';
import { TaskCard } from 'widgets/TaskCard';
import { TaskDetail } from 'widgets/TaskDetail';

import { BoardPageHeader } from './BoardPageHeader';
import { useBoardPageTaskCards } from '../model/useBoardPageTaskCards';
import { useBoardPageTaskCardsSocket } from '../model/useBoardPageTaskCardsSocket';

import Styles from './BoardPage.module.scss';

export function BoardPage() {
  const { steps } = useSteps();
  const {
    taskDetailRef,
    handleReorder,
    getStepTaskCards,
    handleCardClick,
    handleCardStepChange,
  } = useBoardPageTaskCards();

  const { hasManagerAccess } = useBoard();

  useBoardPageTaskCardsSocket();

  return (
    <div className={Styles.BoardKanbanPage}>
      <BoardPageHeader />

      <div className={Styles.BoardSteps}>
        {steps.map((step) => (
          <StepBox key={step.id} step={step} isReady={true}>
            <AnimatedList
              dataSource={getStepTaskCards(step.id)}
              keyProp={'key'}
              className={Styles.BoardTaskCardsBox}
              reorder={{
                active: hasManagerAccess,
                setter: handleReorder,
                axis: 'y',
              }}
              renderItem={(item, control, index) => (
                <TaskCard
                  key={item.key}
                  index={index ?? 0}
                  control={control}
                  task={item.task}
                  status={item.status}
                  onClick={handleCardClick}
                  onStepChangeClick={handleCardStepChange}
                />
              )}
            />
          </StepBox>
        ))}
      </div>

      <TaskDetail ref={taskDetailRef} />
    </div>
  );
}
