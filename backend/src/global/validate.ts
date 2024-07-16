import { Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { ParamSchema } from "express-validator/lib/middlewares/schema";

export type TValidateEntity<T> = Record<keyof T, ParamSchema> | {};

export function checkValid<T>(entity: TValidateEntity<T>) {
	for (const key in entity) {
		entity[key] = { ...entity[key], notEmpty: true, trim: true };
	}
	return checkSchema(entity);
}

export function validate(req: Request, res: Response) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return errors;
	}
	return null;
}
