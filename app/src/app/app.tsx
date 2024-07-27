import { AppRouter } from "../router/AppRouter";
import { UserContextProvider } from './providers/UserContext';
import { ConfigProvider } from "antd";
import { AntConfig } from "./theme/ant-config";
import "./theme/index.scss";

export function App() {
	return (
		<ConfigProvider theme={AntConfig}>
			<UserContextProvider>
				<AppRouter />
			</UserContextProvider>
		</ConfigProvider>
	);
}
