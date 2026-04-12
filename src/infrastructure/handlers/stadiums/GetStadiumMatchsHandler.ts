import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { StadiumService } from "@application/services/StadiumService"
import { Match } from "@domain/entities/Match"
import { Stadium } from "@domain/entities/Stadium"
import { NotFoundError } from "@domain/errors/NotFoundError"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Repository } from "typeorm"

const stadiumRepository: Repository<Stadium> = AppDataSource.getRepository(Stadium)
const matchRepository: Repository<Match> = AppDataSource.getRepository(Match)
const stadiumService: StadiumService = new StadiumService(stadiumRepository)

export class GetStadiumMatchsHandler {
  async handle(c: Context) {
    try {
      const { name } = c.req.param()

      await stadiumService.findByName(name)

      const matchs = await matchRepository.find()

      const data = matchs.filter(
        (match) => match.stadium.name.toLowerCase() === name.toLowerCase()
      )

      return c.json({
        success: true,
        data
      })
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message })
      }

      throw e
    }
  }
}