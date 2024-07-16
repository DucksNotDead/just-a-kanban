import { Request, Response } from "express";
import { sendError, sendSuccess } from "../../../response/senders";
import { db } from "../../../db";

export async function getUserTasks(request: Request, response: Response) {
  const { user } = request.body

  const tasks = await db.tasks().find({
    loadRelationIds: true,
    where: { user }
  })

  return sendSuccess(response, {
    tasks
  })
}