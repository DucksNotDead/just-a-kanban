import { Request, Response } from "express";
import { db } from "../../../db";
import { sendSuccess } from "../../../response/senders";

export async function getSteps(request: Request, response: Response) {
	return sendSuccess(response, {
		steps: await db.steps().find(),
	});
}
