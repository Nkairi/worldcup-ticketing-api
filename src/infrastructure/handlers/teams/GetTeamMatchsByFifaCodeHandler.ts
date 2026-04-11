import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { teams } from "@infrastructure/mock/teams"
import { matchs } from "@infrastructure/mock/matchs"

export class GetTeamMatchsByFifaCodeHandler {
  async handle(c: Context) {
    const fifaCode = c.req.param("fifaCode").toUpperCase()

    if (!/^[A-Z]{3}$/.test(fifaCode)) {
      throw new HTTPException(400, { message: "Invalid FIFA code" })
    }

    const team = teams.find((t) => t.fifaCode === fifaCode)

    if (!team) {
      throw new HTTPException(404, { message: "Team not found" })
    }

    const filteredMatchs = matchs.filter(
      (match) =>
        match.homeTeam.fifaCode === fifaCode ||
        match.awayTeam.fifaCode === fifaCode
    )

    return c.json({
      success: true,
      data: filteredMatchs
    })
  }
}