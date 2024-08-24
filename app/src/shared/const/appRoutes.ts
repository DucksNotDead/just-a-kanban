export const appRoutes = {
  login: '/login',
  home: '/boards',
  board(boardSlug: string) {
    return `/boards/${boardSlug}`;
  },
} as const;
