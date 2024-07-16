export const PORT = 8080

export const  SECRET_KEY = "qwertyxvz"

export const AuthRoutes = ["registration", "login", "auth"] as const

export const DB_CONFIG = {
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "kanban",
}