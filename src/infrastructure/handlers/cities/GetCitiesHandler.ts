import { Context } from "hono"
import { cities } from "@infrastructure/mock/cities"

export class GetCitiesHandler {
  async handle(c: Context) {
    const name = c.req.query("name")

    let result = [...cities]

    if (name) {
      result = result.filter((city) =>
        city.name.toLowerCase().includes(name.toLowerCase())
      )
    }

    return c.json({
      success: true,
      data: result
    })
  }
}