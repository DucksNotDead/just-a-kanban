import { IAppController } from "../../global/types";
import { AuthRoutes } from "../../global/const";
import { UserValidator } from "./validators/UserValidator";
import { signIn } from "./operations/signIn";
import { signUp } from "./operations/signUp";
import { auth } from "./operations/auth";
import { bye } from "./operations/bye";

const [registrationRoute, loginRoute, authRoute] = AuthRoutes;

export const AuthController: IAppController = {
	["post|/" + registrationRoute]: { action: signIn, validator: UserValidator },
	["post|/" + loginRoute]: { action: signUp, validator: UserValidator },
	["post|/" + authRoute]: { action: auth },
	"delete|/user": { action: bye },
};
