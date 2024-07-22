import { LoginPage } from "../pages/login-page";
import { KanbanPage } from "../pages/kanban-page";
import { IAppRoute } from 'constants/Types';

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
