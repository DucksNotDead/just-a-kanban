import { Request, Response } from "express";
import { db } from "../../../db";
import { sendError, sendSuccess } from "../../../response/senders";

export async function updateCategory(request: Request, response: Response) {
	try {
		const { user, ...category } = request.body;

		const candidate = await db
			.categories()
			.findOneBy({ id: category.id, user });
		if (!candidate) {
			return sendError(response, 405);
		}

		for (const newField in category) {
			candidate[newField] = category[newField];
		}

		const updated = await db.categories().save(candidate);

		return sendSuccess(response, {
			data: updated,
		});
	} catch {
		return sendError(response, 500);
	}
}
