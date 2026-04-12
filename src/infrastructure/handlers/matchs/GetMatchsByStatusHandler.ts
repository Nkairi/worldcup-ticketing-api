import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Match } from "@domain/entities/Match"

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

    const matchRepository = AppDataSource.getRepository(Match)
    const matchs = await matchRepository.find()

    const filteredMatchs = matchs.filter((match) => match.status === status)

    return c.json({
      success: true,
      data: filteredMatchs
    })
  }
}