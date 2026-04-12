import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Team } from "@domain/entities/Team"

export class GetTeamByFifaCodeHandler {
  async handle(c: Context) {
    const fifaCode = c.req.param("fifaCode").toUpperCase()

    if (!/^[A-Z]{3}$/.test(fifaCode)) {
      throw new HTTPException(400, { message: "Invalid FIFA code" })
    }

    const teamRepository = AppDataSource.getRepository(Team)

    const team = await teamRepository.findOneBy({ fifaCode })

    if (!team) {
      throw new HTTPException(404, { message: "Team not found" })
    }

    return c.json({
      success: true,
      data: team
    })
  }
}