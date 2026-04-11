import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { matchs } from "@infrastructure/mock/matchs"

export class GetMatchsHandler {
  async handle(c: Context) {
    const teamCode = c.req.query("team[code]")
    const stage = c.req.query("stage")
    const date = c.req.query("date")

    let result = [...matchs]

    if (teamCode) {
      const normalizedCode = teamCode.toUpperCase()

      if (!/^[A-Z]{3}$/.test(normalizedCode)) {
        throw new HTTPException(400, { message: "Invalid FIFA code" })
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
        "third_place",
        "final"
      ]

      if (!allowedStages.includes(stage)) {
        throw new HTTPException(400, { message: "Invalid stage" })
      }

      result = result.filter((match) => match.stage === stage)
    }

    if (date) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        throw new HTTPException(400, { message: "Invalid date format" })
      }

      result = result.filter(
        (match) => match.date.toISOString().split("T")[0] === date
      )
    }

    return c.json({
      success: true,
      data: result
    })
  }
}