import { Request, Response } from "express";
import { db } from "../../../db";
import { sendError, sendSuccess } from "../../../response/senders";


export async function createTask(request: Request, response: Response) {
  const { user, ...task } = request.body

  const candidate = await db.tasks().findOneBy({ title: task.title })
  if (candidate) {
    return sendError(response, 403, { id: candidate.id })
  }

  if (task.category) {
    const category = await db.categories().findOneBy({ user, id: task.category })
    if (!category) {
      task.category = null
    }
  }
  else {
    task.category = null
  }

  const firstStep = (await db.steps().find({ take: 1 }))[0]
  task.user = user
  task.step = firstStep

  const newTask = await db.tasks().save(db.tasks().create(task))
  //@ts-ignore
  delete newTask.user

  return sendSuccess(response, { newTask })
}
