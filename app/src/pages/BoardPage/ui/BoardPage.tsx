import { useBoard } from 'entities/board';
import { StepBox, TStep, useSteps } from 'entities/step';
import { UserItem } from 'entities/user';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import { appTransitions } from 'shared/const';
import { AnimatedList } from 'shared/ui';
import { ITaskCard, TaskCard } from 'widgets/TaskCard';
import { TaskDetail } from 'widgets/TaskDetail';

import { BoardPageHeader } from './BoardPageHeader';
import { IBoardPageFilters } from '../model/types/boardPageTypes';
import { useBoardPageStepReorderState } from '../model/useBoardPageStepReorderState';
import { useBoardPageTaskCards } from '../model/useBoardPageTaskCards';
import { useBoardPageTaskCardsSocket } from '../model/useBoardPageTaskCardsSocket';

import Styles from './BoardPage.module.scss';

export function BoardPage() {
  const { steps } = useSteps();
  const [filters, setFilters] = useState<IBoardPageFilters>({});

  const isFiltersActive = useMemo<boolean>(() => {
    const { search, user, slice } = filters;
    return !(
      (search === undefined || !search.length) &&
      user === undefined &&
      slice === undefined
    );
  }, [filters]);

  const {
    tasksPending,
    taskDetailRef,
    handleCardsReorder,
    getStepTaskCards,
    handleCardClick,
    handleCardStepChange,
    handleCardsReorderEnd
  } = useBoardPageTaskCards(filters);

  const { hasManagerAccess } = useBoard();

  const { reorderers, handleStepReorderStart, handleStepReorderingEnd } =
    useBoardPageStepReorderState();

  const handleBoardPageStepReorderEnd = useCallback((stepId: TStep) => {
    handleStepReorderingEnd(stepId)
    handleCardsReorderEnd()
  }, []);

  useBoardPageTaskCardsSocket();

  return (
    <div className={Styles.BoardKanbanPage}>
      <BoardPageHeader
        setFilters={setFilters}
        taskDetailDialogRef={taskDetailRef}
      />

      <div className={Styles.BoardSteps}>
        {steps.map((step) => {
          const reorderer = reorderers[step.id];
          return (
            <StepBox key={step.id} step={step} isReady={!tasksPending}>
              <AnimatePresence>
                {reorderers[step.id] && (
                  <motion.div
                    {...appTransitions.layoutHeight}
                    layout={'size'}
                    className={Styles.BoardStepsReorder}
                  >
                    <UserItem
                      name={reorderer?.name}
                      avatar={reorderer?.avatar}
                    />
                    <div>меняет порядок</div>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatedList
                dataSource={getStepTaskCards(step.id)}
                keyProp={'key'}
                className={Styles.BoardTaskCardsBox}
                reorder={{
                  active:
                    hasManagerAccess &&
                    !isFiltersActive &&
                    !reorderer &&
                    getStepTaskCards(step.id).length > 1,
                  setter: handleCardsReorder,
                  axis: 'y',
                  onStart: ({ task: { step } }) => handleStepReorderStart(step),
                  onEnd: ({ task: { step } }) => handleBoardPageStepReorderEnd(step),
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
          );
        })}
      </div>

      <TaskDetail ref={taskDetailRef} />
    </div>
  );
}
