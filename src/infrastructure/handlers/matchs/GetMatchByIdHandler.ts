import { Context } from "hono"
import { matchs } from "@infrastructure/mock/matchs"

export class GetMatchByIdHandler {
  async handle(c: Context) {
    const id = Number(c.req.param("id"))

    const match = matchs.find((m) => m.id === id)

    if (!match) {
      return c.json(
        {
          success: false,
          message: "Match not found"
        },
        404
      )
    }

    return c.json({
      success: true,
      data: match
    })
  }
}