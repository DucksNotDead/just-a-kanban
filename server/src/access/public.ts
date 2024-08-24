import { SetMetadata } from "@nestjs/common";

import { IS_PUBLIC_KEY } from "../modules/auth/auth.const";

export const PublicAccess = () => SetMetadata(IS_PUBLIC_KEY, true);