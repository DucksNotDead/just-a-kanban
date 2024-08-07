function format(item: string | number): string {
	return item.toString().padStart(2, '0');
}

export function getCurrentDate(): string {
	const d = new Date();
	const date = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
		.map(format)
		.join('-');
	const time = [d.getHours(), d.getMinutes(), d.getSeconds()]
		.map(format)
		.join(':');
	return date + 'T' + time;
}
