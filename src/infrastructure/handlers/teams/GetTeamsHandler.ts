import { Context } from "hono"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Team } from "@domain/entities/Team"
import { HTTPException } from "hono/http-exception"

export class GetTeamsHandler {
  async handle(c: Context) {
    const sort = c.req.query("sort")
    const name = c.req.query("name")

    const teamRepository = AppDataSource.getRepository(Team)

    let teams = await teamRepository.find()

    if (name) {
      teams = teams.filter((team) =>
        team.name.toLowerCase().includes(name.toLowerCase())
      )
    }

    if (!sort || sort === "name") {
      teams.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === "-name") {
      teams.sort((a, b) => b.name.localeCompare(a.name))
    } else {
      throw new HTTPException(400, { message: "Invalid sort value" })
    }

    return c.json({
      success: true,
      data: teams
    })
  }
}