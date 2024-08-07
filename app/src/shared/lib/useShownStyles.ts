import { useEffect, useState } from 'react';

export function useShownStyles(
	Styles: Record<string, string>,
	subClassName: string | null = null,
) {
	const [shown, setShown] = useState(false);
	const [subClass, setSubClass] = useState<string | null>(null);
	useEffect(() => {
		setTimeout(() => {
			setSubClass(() => subClassName);
			setShown(() => true);
		}, 10);
		setTimeout(() => setSubClass(() => null), 100);
	}, []);
	return `${shown ? Styles.Shown : ''} ${subClass ? Styles[subClass] : ''}`;
}
