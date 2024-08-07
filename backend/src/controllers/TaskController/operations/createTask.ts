import { Request, Response } from 'express';
import { db } from '../../../db';
import { sendError, sendSuccess } from '../../../response/senders';
import { Task } from '../../../entity/Task';
import { getCurrentDate } from '../../../common/getCurrentDate';

export async function createTask(request: Request, response: Response) {
	const { user, ...task } = request.body;

	const candidate = await db.tasks().findOneBy({ title: task.title });
	if (candidate) {
		return sendError(response, 403, { id: candidate.id });
	}

	task.user = user;

	if (task.category) {
		const category = await db
			.categories()
			.findOneBy({ user, id: task.category });
		if (!category) {
			task.category = null;
		}
	} else {
		task.category = null;
	}

	task.step = await db.steps().findOne({})

	const currentDate = getCurrentDate();
	task.updated = currentDate;
	task.created = currentDate;

	const newTask = await db.tasks().save(db.tasks().create(task as Task));

	delete newTask.user;

	return sendSuccess(response, { data: newTask });
}
