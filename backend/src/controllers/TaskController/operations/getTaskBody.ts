import { Request, Response } from "express";
import { db } from "../../../db";
import { sendError, sendSuccess } from "../../../response/senders";

export async function getTaskBody(request: Request, response: Response) {
	const { user, id } = request.body;

	const candidate = await db.tasks().findOne({
		where: { id, user },
		select: ['body', 'user', 'id', 'created'],
	});
	if (!candidate) {
		return sendError(response, 405);
	}

	return sendSuccess(response, { data: candidate });
}
