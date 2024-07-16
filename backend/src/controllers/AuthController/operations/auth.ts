import { Request, Response } from "express";
import { userFromRequest } from "../../../global/hashing";
import { sendError, sendSuccess } from "../../../response/senders";

export async function auth(request: Request, response: Response) {
	const user = await userFromRequest(request);
	if (!user) {
		return sendError(response, 401);
	}
	return sendSuccess(response, { user });
}
