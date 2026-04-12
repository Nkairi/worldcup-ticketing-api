import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { TeamService } from "@application/services/TeamService"
import { Team } from "@domain/entities/Team"
import { NotFoundError } from "@domain/errors/NotFoundError"
import { ValidationError } from "@domain/errors/ValidationError"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Repository } from "typeorm"

const teamRepository: Repository<Team> = AppDataSource.getRepository(Team)
const teamService: TeamService = new TeamService(teamRepository)

export class GetTeamByFifaCodeHandler {
  async handle(c: Context) {
    try {
      const { fifaCode } = c.req.param()

      const data = await teamService.findByFifaCode(fifaCode)

      return c.json({
        success: true,
        data
      })
    } catch (e) {
      if (e instanceof ValidationError) {
        throw new HTTPException(400, { message: e.message })
      }

      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message })
      }

      throw e
    }
  }
}