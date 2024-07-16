import { Request, Response } from "express";
import { AuthRoutes } from "../global/const";
import { sendError } from "../response/senders";
import { userFromRequest } from "../global/hashing";

export async function AuthMiddleware(req: Request, res:Response, next: () => void) {
  if (AuthRoutes.includes(req.route.path.split("/")[1])) {
    next()
    return
  }
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return sendError(res, 401)
    }
    const user = await userFromRequest(req)
    if (!user) {
      return sendError(res, 401)
    }
    req.body = { ...req.body, user }
    next()
  }
  catch {
    return sendError(res, 401)
  }
}