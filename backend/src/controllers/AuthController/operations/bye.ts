import { Request, Response } from "express";
import { db } from "../../../db";
import { sendSuccess } from "../../../response/senders";

export async function bye(request: Request, response: Response) {
	const { user } = request.body;
	await db.users().delete({ id: user.id });
	return sendSuccess(response, {
		message: "bye-bye",
	});
}
