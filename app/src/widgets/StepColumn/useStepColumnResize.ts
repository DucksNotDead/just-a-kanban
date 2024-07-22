//@ts-nocheck
import { useEffect, useRef } from 'react';

interface ITaskPosition {
	id: string;
	x: number;
	y: number;
}

const DIVIDER = 1;
const HIDDEN = 6;
const TRANSITION_DURATION = 180;
const OPEN_WIDTH = 100 - (HIDDEN + DIVIDER) * 3;
const CLOSE_WIDTH = (100 - DIVIDER * 3) / 4;

function getTaskPosition(taskNode: HTMLElement): ITaskPosition {
	return {
		id: taskNode.dataset.id as string,
		x: taskNode.offsetLeft,
		y: taskNode.offsetTop,
	};
}

function getTaskCards(column: HTMLElement) {
	return Array.from(column.children).filter((el) =>
		el.classList.contains('taskCard'),
	);
}

function animate(draw: (frame: number) => void) {
	let start = performance.now();

	requestAnimationFrame(function animate(time) {
		// timeFraction изменяется от 0 до 1
		let progress = (time - start) / TRANSITION_DURATION;
		if (progress > 1) progress = 1;

		draw(progress);

		if (progress < 1) {
			requestAnimationFrame(animate);
		}
	});
}

function setTaskPositionToDefault(style: CSSStyleDeclaration) {
	style.removeProperty('position');
	style.removeProperty('left');
	style.removeProperty('top');
}

function setDisplayProps(elem: HTMLElement, isOpen: boolean) {
	if (isOpen) {
		elem.style.flexDirection = 'row';
		elem.style.flexWrap = 'wrap';
		elem.style.alignContent = 'start';
		elem.style.alignItems = 'start';
		elem.style.justifyContent = 'center';
	} else {
		Array.from(elem.children).forEach((child: HTMLElement) => {
			setTaskPositionToDefault(child.style);
		});
	}
}

export function useStepColumnResize(
	column: HTMLDivElement | null,
	isColumnOpen: boolean,
	viewWidth: number | undefined,
) {
	const prevColumnOpen = useRef<boolean | null>(null);
	useEffect(() => {
		if (
			viewWidth !== undefined &&
			column &&
			prevColumnOpen.current !== isColumnOpen
		) {
			prevColumnOpen.current = isColumnOpen;
			const columnClone = column.cloneNode(true) as HTMLElement;
			columnClone.style.width =
				(viewWidth / 100) * (isColumnOpen ? OPEN_WIDTH : CLOSE_WIDTH) +
				'px';
			columnClone.style.zIndex = -1;
			columnClone.style.position = 'absolute';
			column.parentElement.append(columnClone);
			setDisplayProps(columnClone, isColumnOpen);
			const endTasks = getTaskCards(columnClone).map(getTaskPosition);
			columnClone.remove();
			getTaskCards(column).forEach((startTaskNode: HTMLElement) => {
				const end = endTasks.find(
					(et) => et.id === startTaskNode.dataset.id,
				);
				if (end) {
					const start = getTaskPosition(startTaskNode);
					if (end.x !== start.x || end.y !== start.y) {
						const style = startTaskNode.style;
						style.position = 'absolute';
						animate((progress) => {
							const diffX = (end.x - start.x) * progress;
							const diffY = (end.y - start.y) * progress;
							style.left = start.x + diffX + 'px';
							style.top = start.y + diffY + 'px';
							if (progress === 1 && !isColumnOpen) {
								setTimeout(() => {
									getTaskCards(column).forEach(({ style: updatedStyle }) => {
										setTaskPositionToDefault(updatedStyle);
									});
								}, TRANSITION_DURATION)
							}
						});
					}
				}
			});
		}
	}, [isColumnOpen, viewWidth, column]);
}

//ON DEBOUNCE
/*export function useStepColumnResize(
	columnRef: MutableRefObject<HTMLDivElement | null>,
	isColumnFullSize: boolean,
) {
	const column = useMemo(() => columnRef.current, [columnRef.current]);
	const timeout = useRef<any>(null);
	const firstSnapTasks = useRef<ITaskPosition[] | null>(null);

	function debounce(callback: Function) {
		if (timeout.current) {
			clearTimeout(timeout.current);
			timeout.current = null;
		}
		timeout.current = setTimeout(() => callback(), 20);
	}

	useResizeDetector({
		targetRef: columnRef,
		onResize: () => {
			if (column) {
				if (!firstSnapTasks.current) {
					firstSnapTasks.current = Array.from(column.children).map(
						getTaskPosition,
					);
				}

				debounce(() => {
					if (isColumnFullSize) {
						column.style.flexDirection = 'row';
						column.style.flexWrap = 'wrap';
					} else {
						column.style.flexDirection = 'column';
						column.style.flexWrap = 'nowrap';
					}
					Array.from(column.children).forEach(
						(endTaskNode: HTMLElement) => {
							const start = firstSnapTasks.current?.find(
								(task) => task.id === endTaskNode.dataset.id,
							);
							if (start) {
								const end = getTaskPosition(endTaskNode);
								if (end.x !== start.x || end.y !== start.y) {
									if (!column.querySelector('#taskClone' + end.id)) {
										const clone = endTaskNode.cloneNode(
											true,
										) as HTMLElement;
										clone.id = 'taskClone' + end.id;
										clone.dataset.id = '';
										clone.style.position = 'absolute';
										clone.style.left = start.x + 'px';
										clone.style.top = start.y + 'px';
										column.append(clone);
										endTaskNode.style.opacity = '0';
										animate((progress) => {
											const diffX = (end.x - start.x) * progress
											const diffY = (end.y - start.y) * progress
											clone.style.transform = `translateX(${diffX}px) translateY(${diffY}px)`
										});
										setTimeout(() => {
											endTaskNode.style.opacity = '1';
											clone.remove();
										}, TRANSITION_DURATION);
									}
								}
							}
						},
					);
				});
			}
		},
	});
}*/
