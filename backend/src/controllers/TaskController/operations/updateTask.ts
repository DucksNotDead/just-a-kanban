import { Request, Response } from "express";
import { db } from "../../../db";
import { sendError, sendSuccess } from "../../../response/senders";

export async function updateTask(request: Request, response: Response) {
  try {
    const {user, ...task} = request.body

    const candidate = await db.tasks().findOneBy({ id: task.id, user })
    if (!candidate) {
      return sendError(response, 405)
    }

    for (const newField in task) {
      if (!["step", "user"].includes(newField)) {
        candidate[newField] = task[newField]
      }
    }

    await db.tasks().save(candidate)

    const updated = await db.tasks().findOne({
      where: { id: task.id },
      relations: {
        category: true,
        step: true
      }
    })

    return sendSuccess(response, {
      task: updated
    })
  }
  catch {
    return sendError(response, 500)
  }
}