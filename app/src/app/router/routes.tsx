import { IAppRoute } from 'shared/const/types';
import { LoginPage } from 'pages/LoginPage';
import { KanbanPage } from 'pages/KanbanPage';

export const routes: IAppRoute[] = [
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/tasks",
		element: <KanbanPage />,
	},
];
