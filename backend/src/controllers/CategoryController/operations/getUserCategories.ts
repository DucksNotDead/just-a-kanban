import { Request, Response } from "express";
import { db } from "../../../db";
import { sendSuccess } from "../../../response/senders";

export async function getUserCategories(request: Request, response: Response) {
	const { user } = request.body;

	const categories = await db.categories().findBy({ user });

	return sendSuccess(response, { categories });
}
