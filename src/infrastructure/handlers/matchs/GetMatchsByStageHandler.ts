import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { matchs } from "@infrastructure/mock/matchs"

export class GetMatchsByStageHandler {
  async handle(c: Context) {
    const stage = c.req.param("stage")

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

    const filteredMatchs = matchs.filter((match) => match.stage === stage)

    return c.json({
      success: true,
      data: filteredMatchs
    })
  }
}