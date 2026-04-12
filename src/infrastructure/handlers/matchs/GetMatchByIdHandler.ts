import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Match } from "@domain/entities/Match"

export class GetMatchByIdHandler {
  async handle(c: Context) {
    const id = Number(c.req.param("id"))

    const matchRepository = AppDataSource.getRepository(Match)

    const match = await matchRepository.findOneBy({ id })

    if (!match) {
      throw new HTTPException(404, { message: "Match not found" })
    }

    return c.json({
      success: true,
      data: match
    })
  }
}