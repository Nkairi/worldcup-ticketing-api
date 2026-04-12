import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { MatchService } from "@application/services/MatchService"
import { Match } from "@domain/entities/Match"
import { NotFoundError } from "@domain/errors/NotFoundError"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Repository } from "typeorm"

const matchRepository: Repository<Match> = AppDataSource.getRepository(Match)
const matchService: MatchService = new MatchService(matchRepository)

export class GetMatchByIdHandler {
  async handle(c: Context) {
    try {
      const id = Number(c.req.param("id"))

      const data = await matchService.findById(id)

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