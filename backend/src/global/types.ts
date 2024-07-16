import { Request, Response } from "express";
import { errorMessages } from "./errors";
import { ValidationChain } from "express-validator";
import { RunnableValidationChains } from "express-validator/lib/middlewares/schema";

export type TControllerAction = (request: Request, response: Response) => any;

export interface IAppRoute {
	path: string;
	method: "get" | "post" | "update" | "delete";
	action: TControllerAction;
	validator: any;
}

export interface IAppController
	extends Record<
		string,
		{
			action: TControllerAction;
			validator?: RunnableValidationChains<ValidationChain>;
		}
	> {}

export type TErrorCode = keyof typeof errorMessages;
