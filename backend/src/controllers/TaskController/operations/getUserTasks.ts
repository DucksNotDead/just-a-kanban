import { Request, Response } from 'express';
import { sendSuccess } from '../../../response/senders';
import { db } from '../../../db';
import { Task } from '../../../entity/Task';

export async function getUserTasks(request: Request, response: Response) {
	const { user } = request.body;

	const tasks = (
		await db.tasks().find({
			where: { user },
			relations: {
				category: true,
				step: true,
			},
			select: [
				'id',
				'title',
				'description',
				'preview',
				'starts',
				'deadline',
				'inBasket',
				'stepReason',
				'updated',
			],
		})
	).sort((a, b) => {
		return new Date(b.updated).getTime() - new Date(a.updated).getTime();
	});

	return sendSuccess(response, {
		data: tasks,
	});
}
