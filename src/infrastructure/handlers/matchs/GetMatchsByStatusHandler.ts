import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { matchs } from "@infrastructure/mock/matchs"

export class GetMatchsByStatusHandler {
  async handle(c: Context) {
    const status = c.req.param("status")

    const allowedStatus = [
      "scheduled",
      "live",
      "finished",
      "cancelled"
    ]

    if (!allowedStatus.includes(status)) {
      throw new HTTPException(400, { message: "Invalid status" })
    }

    const filteredMatchs = matchs.filter((match) => match.status === status)

    return c.json({
      success: true,
      data: filteredMatchs
    })
  }
}