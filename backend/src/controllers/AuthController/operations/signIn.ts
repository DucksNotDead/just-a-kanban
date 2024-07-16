import { Request, Response } from "express";
import { db } from "../../../db";
import {
	comparePassword,
	createToken,
	hashPassword,
	userFromRequest,
} from "../../../global/hashing";
import { sendError, sendSuccess } from "../../../response/senders";
import { signUp } from "./signUp";

export async function signIn(request: Request, response: Response) {
	const { username, password } = request.body;
	const candidate = await db.users().findOneBy({ username });
	if (candidate) {
		return await signUp(request, response, true);
	}
	const newUser = db
		.users()
		.create({ username, password: await hashPassword(password) });
	await db.users().save(newUser);
	return await signUp(request, response);
}
