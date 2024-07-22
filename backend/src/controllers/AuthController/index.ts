import { IAppController } from "../../global/types";
import { AuthRoutes } from "../../global/const";
import { UserValidator } from "./validators/UserValidator";
import { signUp } from "./operations/signUp";
import { login } from "./operations/login";
import { auth } from "./operations/auth";
import { bye } from "./operations/bye";

const [registrationRoute, loginRoute, authRoute] = AuthRoutes;

export const AuthController: IAppController = {
	["post|/" + registrationRoute]: { action: signUp, validator: UserValidator },
	["post|/" + loginRoute]: { action: login, validator: UserValidator },
	["post|/" + authRoute]: { action: auth },
	"delete|/user": { action: bye },
};
