import { useResizeDetector } from 'react-resize-detector';
import { MutableRefObject, useEffect, useRef } from 'react';
import { ITaskPosition } from '../model/types';
import {
	COLUMN_CLOSE_WIDTH,
	COLUMN_HIDE_DURATION,
	COLUMN_OPEN_WIDTH,
	TASK_MAX_WIDTH,
	TASK_MIN_WIDTH,
	COLUMN_RESIZE_TRANSITION_DURATION,
	COLUMN_INNER_OFFSET,
} from '../model/const';

function getTaskPosition(
	taskNode: HTMLElement | null,
): ITaskPosition | null {
	if (taskNode && taskNode.parentElement) {
		return {
			id: taskNode.dataset.id as string,
			x: taskNode.offsetLeft,
			y: taskNode.offsetTop,
		};
	} else return null;
}

function getTasksInner(column: HTMLElement | null): HTMLElement | null {
	if (column) {
		return column.querySelector('.taskCards');
	} else return null;
}

function getTaskCards(column: HTMLElement): (HTMLElement | null)[] {
	//@ts-ignore
	return Array.from(column.children);
}

function animate(draw: (frame: number) => void, duration: number) {
	let start = performance.now();
	return requestAnimationFrame(function animate(time) {
		let progress = (time - start) / duration;
		if (progress > 1) progress = 1;

		draw(progress);

		if (progress < 1) {
			requestAnimationFrame(animate);
		}
	});
}

export function useStepColumnLayoutAnimation(
	columnRef: MutableRefObject<HTMLElement | null>,
	isColumnOpen: boolean,
	isColumnHidden: boolean,
	viewWidth: number | undefined,
) {
	const prevColumnOpen = useRef<boolean | null>(null);
	const hideTimeout = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		const column = getTasksInner(columnRef.current);
		if (column) {
			if (isColumnHidden) {
				hideTimeout.current = setTimeout(() => {
					if (column) column.style.display = 'none';
				}, COLUMN_HIDE_DURATION);
			} else {
				clearTimeout(hideTimeout.current);
				column.removeAttribute('style');
			}
			if (viewWidth !== undefined) {
				prevColumnOpen.current = isColumnOpen;

				//CREATE A NODE CLONE-HELPER
				const columnClone = column.cloneNode(true) as HTMLElement;

				//SETTING STATIC POSITION STYLE
				columnClone.style.width =
					(viewWidth / 100) *
						(isColumnOpen ? COLUMN_OPEN_WIDTH : COLUMN_CLOSE_WIDTH) +
					'px';
				columnClone.style.padding = '0 ' + COLUMN_INNER_OFFSET + 'px';
				columnClone.style.gap = COLUMN_INNER_OFFSET + 'px';
				columnClone.style.zIndex = '-1';
				columnClone.style.position = 'absolute';
				getTaskCards(columnClone).forEach((endTaskNode) => {
					if (endTaskNode) {
						endTaskNode.style.position = 'static';
						endTaskNode.style.removeProperty('width');
						endTaskNode.style.removeProperty('top');
						endTaskNode.style.removeProperty('left');
					}
				});

				//ADD CLONE TO DOM
				column.parentElement?.append(columnClone);

				//GET FINAL COORDS
				const ends = getTaskCards(columnClone).map(getTaskPosition);

				//REMOVE CLONE-HELPER
				columnClone.remove();

				//GET ITEMS
				const startTasks = getTaskCards(column);

				//GET START COORDS
				const starts = startTasks.map(getTaskPosition);

				//ITERATE ITEMS
				startTasks.forEach((startTaskNode) => {
					const end = ends.find(
						(et) => et?.id === startTaskNode?.dataset.id,
					);
					const start = starts.find(
						(st) => st?.id === startTaskNode?.dataset.id,
					);

					//IF COORDS DIFFERENT
					if (end && start && (end.x !== start.x || end.y !== start.y)) {
						const style = startTaskNode?.style;
						if (style) {
							style.position = 'absolute';
							animate((progress) => {
								const dX = (end.x - start.x) * progress;
								const dY = (end.y - start.y) * progress;
								style.left = start.x + dX + 'px';
								style.top = start.y + dY + 'px';

								//END OF TRANSITION
								if (progress === 1) {
								}
							}, COLUMN_RESIZE_TRANSITION_DURATION);
						}
					}
				});
			}
		}
	}, [isColumnOpen, isColumnHidden, viewWidth, columnRef.current]);

	useResizeDetector({
		targetRef: columnRef,
		handleHeight: false,
		onResize: ({ width }) => {
			const column = getTasksInner(columnRef.current);
			if (column) {
				getTaskCards(column).forEach((taskNode) => {
					if (taskNode && width) {
						let taskWidth = width - COLUMN_INNER_OFFSET * 2;
						if (taskWidth >= TASK_MAX_WIDTH) taskWidth = TASK_MAX_WIDTH;
						else if (taskWidth <= TASK_MIN_WIDTH)
							taskWidth = TASK_MIN_WIDTH;
						taskNode.style.width = taskWidth + 'px';
					}
				});
			}
		},
	});
}
