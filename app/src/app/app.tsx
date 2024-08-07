import { ConfigProvider } from "antd";
import { AntConfig } from "./theme/ant-config";
import "./theme/index.scss";
import { UserContextProvider } from 'entities/User';
import { AppRouter } from './router/AppRouter';
import ruRU from 'antd/locale/ru_RU';
import { CategoriesContextProvider } from 'entities/Category/context';

export function App() {
	return (
		<ConfigProvider theme={AntConfig} locale={ruRU}>
			<UserContextProvider>
				<CategoriesContextProvider>
					<AppRouter />
				</CategoriesContextProvider>
			</UserContextProvider>
		</ConfigProvider>
	);
}
