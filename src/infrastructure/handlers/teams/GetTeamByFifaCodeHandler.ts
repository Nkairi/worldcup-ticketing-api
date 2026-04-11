import { Context } from "hono"
import { teams } from "@infrastructure/mock/teams"

export class GetTeamByFifaCodeHandler {
  async handle(c: Context) {
    const fifaCode = c.req.param("fifaCode").toUpperCase()

    if (!/^[A-Z]{3}$/.test(fifaCode)) {
      return c.json(
        {
          success: false,
          message: "Invalid FIFA code"
        },
        400
      )
    }

    const team = teams.find((t) => t.fifaCode === fifaCode)

    if (!team) {
      return c.json(
        {
          success: false,
          message: "Team not found"
        },
        404
      )
    }

    return c.json({
      success: true,
      data: team
    })
  }
}