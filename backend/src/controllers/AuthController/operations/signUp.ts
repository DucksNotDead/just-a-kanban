import { Request, Response } from "express";
import { db } from "../../../db";
import {
	comparePassword,
	createToken,
	hashPassword,
	userFromRequest,
} from "../../../global/hashing";
import { sendError, sendSuccess } from "../../../response/senders";
import { login } from "./login";

export async function signUp(request: Request, response: Response) {
	const { username, name, password } = request.body;
	const candidate = await db.users().findOneBy({ username });
	if (candidate) {
		return await login(request, response, true);
	}
	const newUser = db
		.users()
		.create({ username, name, password: await hashPassword(password) });
	await db.users().save(newUser);
	return await login(request, response);
}
