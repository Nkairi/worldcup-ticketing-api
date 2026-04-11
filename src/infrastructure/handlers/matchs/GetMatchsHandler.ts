import { Context } from "hono"
import { matchs } from "@infrastructure/mock/matchs"

export class GetMatchsHandler {
  async handle(c: Context) {
    const teamCode = c.req.query("team[code]")
    const stage = c.req.query("stage")

    let result = [...matchs]

    if (teamCode) {
      const normalizedCode = teamCode.toUpperCase()

      if (!/^[A-Z]{3}$/.test(normalizedCode)) {
        return c.json(
          {
            success: false,
            message: "Invalid FIFA code"
          },
          400
        )
      }

      result = result.filter(
        (match) =>
          match.homeTeam.fifaCode === normalizedCode ||
          match.awayTeam.fifaCode === normalizedCode
      )
    }

    if (stage) {
      const allowedStages = [
        "group",
        "round_of_32",
        "round_of_16",
        "quarter_finals",
        "semi_finals",
        "final"
      ]

      if (!allowedStages.includes(stage)) {
        return c.json(
          {
            success: false,
            message: "Invalid stage"
          },
          400
        )
      }

      result = result.filter((match) => match.stage === stage)
    }

    return c.json({
      success: true,
      data: result
    })
  }
}