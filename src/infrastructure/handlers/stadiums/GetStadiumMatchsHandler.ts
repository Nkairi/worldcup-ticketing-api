import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Stadium } from "@domain/entities/Stadium"
import { Match } from "@domain/entities/Match"

export class GetStadiumMatchsHandler {
  async handle(c: Context) {
    const name = c.req.param("name").toLowerCase()

    const stadiumRepository = AppDataSource.getRepository(Stadium)
    const matchRepository = AppDataSource.getRepository(Match)

    const stadiums = await stadiumRepository.find()
    const stadium = stadiums.find(
      (stadium) => stadium.name.toLowerCase() === name
    )

    if (!stadium) {
      throw new HTTPException(404, { message: "Stadium not found" })
    }

    const matchs = await matchRepository.find()
    const filteredMatchs = matchs.filter(
      (match) => match.stadium.name.toLowerCase() === name
    )

    return c.json({
      success: true,
      data: filteredMatchs
    })
  }
}