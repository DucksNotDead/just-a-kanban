import { Request, Response } from 'express';
import { sendSuccess } from '../../../response/senders';
import { db } from '../../../db';

export async function getUserTasks(request: Request, response: Response) {
	const { user } = request.body;

	const tasks = (
		await db.tasks().find({
			loadRelationIds: true,
			where: { user },
		})
	).sort((a, b) => {
		return new Date(b.updated).getTime() - new Date(a.updated).getTime();
	});

	return sendSuccess(response, {
		tasks,
	});
}
