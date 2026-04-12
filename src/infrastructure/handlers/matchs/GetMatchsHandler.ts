import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { MatchService } from "@application/services/MatchService"
import { Match } from "@domain/entities/Match"
import { ValidationError } from "@domain/errors/ValidationError"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Repository } from "typeorm"

const matchRepository: Repository<Match> = AppDataSource.getRepository(Match)
const matchService: MatchService = new MatchService(matchRepository)

export class GetMatchsHandler {
  async handle(c: Context) {
    try {
      const teamCode = c.req.query("team[code]")
      const stage = c.req.query("stage")
      const date = c.req.query("date")

      const data = await matchService.findAll({ teamCode, stage, date })

      return c.json({
        success: true,
        data
      })
    } catch (e) {
      if (e instanceof ValidationError) {
        throw new HTTPException(400, { message: e.message })
      }

      throw e
    }
  }
}