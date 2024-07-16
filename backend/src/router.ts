import { IAppRoute, IAppController } from "./global/types";
import { Express, Request, Response } from "express";
import { AuthMiddleware } from "./middleware/AuthMiddleware";
import { validate } from "./global/validate";
import { sendError } from "./response/senders";

export class AppRouter {
  private routes: IAppRoute[] = []
  private middlewares: Function[] = []
  constructor(...controllers: IAppController[]) {
    controllers.forEach(controller => {
      for (const route in controller) {
        const [method, path] = route.split("|")
        const validator = controller[route].validator
        this.routes.push({
          path,
          action: controller[route].action,
          method: method as IAppRoute['method'],
          validator: method !== "get" && validator ? validator : (req: Request, res: Response, next: Function) => next()
        })
      }
    })
  }
  protect(...middlewares: Function[]) {
    this.middlewares = middlewares
    return this
  }
  init(app: Express) {
    this.routes.forEach(route => {
      app[route.method](
        route.path,
        ...this.middlewares,
        route.validator,
        (req: Request, res: Response) => {
          try {
            const errors = validate(req, res)
            if (errors) {
              return sendError(res, 402, { errors: errors.array() })
            }
            route.action(req, res);
          }
          catch {
            return sendError(res, 500)
          }
        })
    })
  }
}