import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { AuthGuard } from "./AuthGuard";
import { Navigate } from 'react-router';

export function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map(route => (
					<Route key={route.path} path={route.path} element={(
						<AuthGuard>
							{route.element as JSX.Element}
						</AuthGuard>
					)}/>
				))}
				<Route path={'*'} element={<Navigate to={'/tasks'}/>}/>
			</Routes>
		</BrowserRouter>
	);
}
