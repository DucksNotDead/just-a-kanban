import { Request, Response } from "express";
import { db } from "../../../db";
import { sendError, sendSuccess } from "../../../response/senders";

export async function createCategory(request: Request, response: Response) {
	const { user, name, color } = request.body;

	const candidate = await db.categories().findOneBy({ name });
	if (candidate) {
		return sendError(response, 403, { id: candidate.id });
	}

	const newCategory = await db
		.categories()
		.save(db.categories().create({ name, color, user }));
	delete newCategory.user;

	return sendSuccess(response, { newCategory });
}
