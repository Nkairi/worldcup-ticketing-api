import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { teams } from "@infrastructure/mock/teams"
import { matchs } from "@infrastructure/mock/matchs"

export class GetTeamMatchsByStageHandler {
  async handle(c: Context) {
    const fifaCode = c.req.param("fifaCode").toUpperCase()
    const stage = c.req.param("stage")

    if (!/^[A-Z]{3}$/.test(fifaCode)) {
      throw new HTTPException(400, { message: "Invalid FIFA code" })
    }

    const allowedStages = [
      "group",
      "round_of_32",
      "round_of_16",
      "quarter_finals",
      "semi_finals",
      "third_place",
      "final"
    ]

    if (!allowedStages.includes(stage)) {
      throw new HTTPException(400, { message: "Invalid stage" })
    }

    const team = teams.find((t) => t.fifaCode === fifaCode)

    if (!team) {
      throw new HTTPException(404, { message: "Team not found" })
    }

    const filteredMatchs = matchs.filter(
      (match) =>
        (match.homeTeam.fifaCode === fifaCode ||
          match.awayTeam.fifaCode === fifaCode) &&
        match.stage === stage
    )

    return c.json({
      success: true,
      data: filteredMatchs
    })
  }
}