import { Request, Response } from 'express';
import { db } from '../../../db';
import { sendError, sendSuccess } from '../../../response/senders';
import { getCurrentDate } from '../../../common/getCurrentDate';

export async function updateTask(request: Request, response: Response) {
	try {
		const { user, ...task } = request.body;

		const candidate = await db.tasks().findOneBy({ id: task.id, user });
		if (!candidate) {
			return sendError(response, 405);
		}

		for (const newField in task) {
			if (!['step', 'user'].includes(newField)) {
				candidate[newField] = task[newField];
			}
		}

		candidate.updated = getCurrentDate();

		await db.tasks().update(candidate.id, candidate);

		const updated = await db.tasks().findOne({
			where: { id: task.id },
			relations: {
				category: true,
				step: true,
			},
		});

		return sendSuccess(response, {
			data: updated,
		});
	} catch (e) {
		console.log(e);
		return sendError(response, 500);
	}
}
