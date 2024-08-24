import { IBoard, boardContext, useBoardsApi } from 'entities/board';
import { useCurrentUser } from 'entities/user';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { CHOSEN_BOARD_KEY, appRoutes } from 'shared/const';

interface IProps {
  children: ReactNode;
}

export function BoardContextProvider({ children }: IProps) {
  const api = useBoardsApi();
  const { user } = useCurrentUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [pending, setPending] = useState(true);
  const [board, setBoard] = useState<IBoard | null>(null);
  const [hasManagerAccess, setHasManagerAccess] = useState(false);

  const boardSlug = useMemo(() => {
    try {
      return pathname.split('/boards/')[1].split('/')[0];
    } catch {
      return null;
    }
  }, [pathname]);

  useEffect(() => {
    if (boardSlug) {
      api
        .getBySlug(boardSlug)
        .then((data) => {
          setBoard(() => data);
          setHasManagerAccess(() => !!data?.managers.includes(user?.id || -1));
          if (data) {
            localStorage.setItem(CHOSEN_BOARD_KEY, data.slug);
          } else {
            navigate(appRoutes.home);
            localStorage.removeItem(CHOSEN_BOARD_KEY);
          }
        })
        .finally(() => setPending(() => false));
    }

    return () => {
      setBoard(() => null)
      setHasManagerAccess(() => false)
      setPending(() => true)
    }
  }, [boardSlug, user]);

  useEffect(() => {
    if (!boardSlug && localStorage.getItem(CHOSEN_BOARD_KEY)) {
      navigate(
        appRoutes.board(localStorage.getItem(CHOSEN_BOARD_KEY) ?? ' '),
      );
    }
  }, [boardSlug, localStorage.getItem(CHOSEN_BOARD_KEY)]);

  return (
    <boardContext.Provider value={{ board, pending, hasManagerAccess }}>
      {children}
    </boardContext.Provider>
  );
}
