import Styles from './CategorySelect.module.scss';
import { ICategory } from 'entities/Category';
import { Select } from 'antd';
import { ReactNode } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { FlattenOptionData } from 'rc-select/lib/interface';
import { LabelInValueType } from 'rc-select/lib/Select';
import { useCategorySelect } from '../../model/useCategorySelect';

interface IProps {
	category?: ICategory | number;
	onChange: (category?: ICategory) => void;
}

interface IOption {
	value: number;
	label: string;
}

export function CategorySelect(props: IProps) {
	const {
		categories,
		idToCategory,
		categoryToId,
		handleSearch,
		idToColor,
	} = useCategorySelect();

	const categoryOption = ({
		label,
		value,
	}: FlattenOptionData<IOption> | LabelInValueType) => {
		return (
			<div className={Styles.CategorySelectItem}>
				{label}
				<div
					className={Styles.CategorySelectItemColor}
					style={{ backgroundColor: idToColor(value as number) }}
				/>
			</div>
		) as ReactNode;
	};

	return (
		<Select
			allowClear={true}
			showSearch={true}
			filterOption={handleSearch}
			value={categoryToId(props.category)}
			placeholder={'Категории'}
			className={Styles.CategorySelect}
			notFoundContent={<LoadingOutlined />}
			options={categories.map((category) => ({
				value: category.id,
				label: category.name,
			}))}
			optionRender={categoryOption}
			labelRender={categoryOption}
			onChange={(value) => props.onChange(idToCategory(value))}
		/>
	);
}
