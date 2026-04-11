import { Context } from "hono"
import { stadiums } from "@infrastructure/mock/stadiums"

export class GetStadiumsHandler {
  async handle(c: Context) {
    const name = c.req.query("name")

    let result = [...stadiums]

    if (name) {
      result = result.filter((stadium) =>
        stadium.name.toLowerCase().includes(name.toLowerCase())
      )
    }

    return c.json({
      success: true,
      data: result
    })
  }
}