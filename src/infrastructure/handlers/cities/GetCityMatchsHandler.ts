import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { cities } from "@infrastructure/mock/cities"
import { matchs } from "@infrastructure/mock/matchs"

export class GetCityMatchsHandler {
  async handle(c: Context) {
    const name = c.req.param("name").toLowerCase()

    const city = cities.find((city) => city.name.toLowerCase() === name)

    if (!city) {
      throw new HTTPException(404, { message: "City not found" })
    }

    const filteredMatchs = matchs.filter(
      (match) => match.stadium.city.name.toLowerCase() === name
    )

    return c.json({
      success: true,
      data: filteredMatchs
    })
  }
}