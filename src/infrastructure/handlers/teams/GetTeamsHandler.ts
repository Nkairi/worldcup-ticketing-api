import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { TeamService } from "@application/services/TeamService"
import { Team } from "@domain/entities/Team"
import { ValidationError } from "@domain/errors/ValidationError"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Repository } from "typeorm"

const teamRepository: Repository<Team> = AppDataSource.getRepository(Team)
const teamService: TeamService = new TeamService(teamRepository)

export class GetTeamsHandler {
  async handle(c: Context) {
    try {
      const name = c.req.query("name")
      const sort = c.req.query("sort")

      const data = await teamService.findAll({ name, sort })

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