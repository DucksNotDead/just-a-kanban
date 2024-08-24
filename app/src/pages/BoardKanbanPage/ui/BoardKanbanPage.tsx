import { BoardKanbanPageHeader } from './BoardKanbanPageHeader';

import Styles from './BoardKanbanPage.module.scss'

export function BoardKanbanPage() {
  return (
    <div className={Styles.BoardKanbanPage}>
      <BoardKanbanPageHeader />
    </div>
  );
}
