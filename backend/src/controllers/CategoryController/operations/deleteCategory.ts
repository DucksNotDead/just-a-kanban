import { Request, Response } from "express";
import { db } from "../../../db";
import { sendError, sendSuccess } from "../../../response/senders";

export async function deleteCategory(request: Request, response: Response) {
	const { user, id } = request.body;

	const candidate = await db.categories().findOneBy({ id, user });
	if (!candidate) {
		return sendError(response, 405);
	}

	await db.categories().delete({ id });

	return sendSuccess(response, { deletedId: id });
}
