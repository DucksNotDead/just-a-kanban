import { JSX, useMemo } from 'react';

interface IProps {
	children: string;
	main?: boolean;
}

export function Title(props: IProps) {
	const TagName = useMemo<keyof JSX.IntrinsicElements>(() => {
		return ('h' +
			(props.main ? '2' : '3')) as keyof JSX.IntrinsicElements;
	}, [props.main]);

	return <TagName>{props.children}</TagName>;
}
