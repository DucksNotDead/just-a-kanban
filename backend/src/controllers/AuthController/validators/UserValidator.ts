import { checkValid } from "../../../global/validate";
import { User } from "../../../entity/User";

export const UserValidator = checkValid<User>({
  username: {
    isLength: {
      options: {
        min: 4,
        max: 24
      }
    },
    trim: true,
    isString: true
  },
  password: {
    isStrongPassword: true
  }
})