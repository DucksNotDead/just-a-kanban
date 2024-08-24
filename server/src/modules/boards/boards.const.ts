import { Board} from "./boards.model";

export interface IReqBoard {
  board: Board;
  manageAccess: boolean;
}

export const BOARD_KEY = 'boardKey'

export const BOARD_SLUG_KEY = 'boardSlug';