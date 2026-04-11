import { Context } from "hono"
import process from "node:process"

export class GetHealthHandler {
  async handle(c: Context) {
    return c.json({
      success: true,
      message: process.env.API_NAME ?? "World Cup Ticketing API",
      uptime: process.uptime(),
      environment: process.env.NODE_ENV ?? "dev"
    })
  }
}