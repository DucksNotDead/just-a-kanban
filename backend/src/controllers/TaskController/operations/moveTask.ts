import { Request, Response } from "express";
import { db } from "../../../db";
import { sendError, sendSuccess } from "../../../response/senders";
import { getCurrentDate } from '../../../common/getCurrentDate';

export async function moveTask(request: Request, response: Response) {
	const { user, step, id } = request.body;

	const candidate = await db.tasks().findOne({
		where: { id, user },
		relations: {
			step: true,
		},
	});
	if (!candidate) {
		return sendError(response, 405);
	}

	if (candidate.step.id.toString() === step) {
		return sendError(response, 403);
	}

	const newStep = await db.steps().findOneBy({ id: step });
	if (!newStep) {
		return sendError(response, 405);
	}

	candidate.stepReason = request.body.reason ?? null;
	candidate.step = newStep;
	candidate.updated = getCurrentDate()
	const updated = await db.tasks().save(candidate);
	return sendSuccess(response, {
		data: updated,
	});
}
