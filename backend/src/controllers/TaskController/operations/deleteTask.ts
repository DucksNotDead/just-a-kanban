import { Request, Response } from "express";
import { db } from "../../../db";
import { sendError, sendSuccess } from "../../../response/senders";

export async function deleteTask(request: Request, response: Response) {
	const { user, id } = request.body;

	const candidate = await db.tasks().findOneBy({ id, user });
	if (!candidate) {
		return sendError(response, 405);
	}

	await db.tasks().delete({ id });

	return sendSuccess(response, { deletedId: id });
}
