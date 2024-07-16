import jwt from "jsonwebtoken"
import bcript from "bcrypt"
import { SECRET_KEY } from "./const";
import { db } from "../db";
import { Request, Response } from "express";

export function createToken(username: string) {
  return jwt.sign({ username }, SECRET_KEY, {expiresIn: "336h"})
}

export async function userFromRequest(request: Request) {
  try {
    const token = request.headers.authorization.split(" ")[1]
    const tokenData = jwt.verify(token, SECRET_KEY)
    if (typeof tokenData === "string") {
      return null
    }
    return await db.users().findOneBy({ username: tokenData.username })
  }
  catch {
    return null
  }
}

export async function hashPassword(password: string) {
  return await bcript.hash(password, 9)
}

export async function comparePassword(password: string, hashPassword: string) {
  return await bcript.compare(password, hashPassword)
}