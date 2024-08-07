import { Request, Response } from "express";
import { sendError, sendSuccess } from "../../../response/senders";
import { comparePassword, createToken } from "../../../global/hashing";
import { db } from "../../../db";

export async function login(
	request: Request,
	response: Response,
	redirected?: boolean,
) {
	const { username, password } = request.body;
	const candidate = await db.users().findOneBy({ username });
	if (!candidate) {
		return sendError(response, 402);
	}
	const isPasswordValid = await comparePassword(password, candidate.password);
	if (!isPasswordValid) {
		return sendError(response, 402);
	}

	delete candidate.password;

	return sendSuccess(response, {
		data: {
			token: createToken(username),
			user: candidate,
			redirected: redirected,
		}
	});
}
