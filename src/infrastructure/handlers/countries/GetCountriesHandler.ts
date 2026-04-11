import { Context } from "hono"
import { countries } from "@infrastructure/mock/countries"

export class GetCountriesHandler {
  async handle(c: Context) {
    const name = c.req.query("name")

    let result = [...countries]

    if (name) {
      result = result.filter((country) =>
        country.name.toLowerCase().includes(name.toLowerCase())
      )
    }

    return c.json({
      success: true,
      data: result
    })
  }
}