import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { countries } from "@infrastructure/mock/countries"

export class GetCountryByCodeHandler {
  async handle(c: Context) {
    const code = c.req.param("code").toLowerCase()

    const country = countries.find(
      (country) => country.name.toLowerCase().startsWith(code)
    )

    if (!country) {
      throw new HTTPException(404, { message: "Country not found" })
    }

    return c.json({
      success: true,
      data: country
    })
  }
}