import Styles from './TaskCard.module.scss';
import { ITaskCard } from '../../types';

interface IProps extends ITaskCard {}

export function TaskCard(props: IProps) {
	return (
		<div className={Styles.TaskCard}>

		</div>
	)
}
