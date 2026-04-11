import { Context } from "hono"
import process from "node:process"

export class GetHomeHandler {
  async handle(c: Context) {
    return c.json({
      success: true,
      message: process.env.API_NAME ?? "World Cup Ticketing API"
    })
  }
}