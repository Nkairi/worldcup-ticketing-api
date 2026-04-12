import { Context } from "hono"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Country } from "@domain/entities/Country"

export class GetCountriesHandler {
  async handle(c: Context) {
    const name = c.req.query("name")

    const countryRepository = AppDataSource.getRepository(Country)

    let countries = await countryRepository.find()

    if (name) {
      countries = countries.filter((country) =>
        country.name.toLowerCase().includes(name.toLowerCase())
      )
    }

    return c.json({
      success: true,
      data: countries
    })
  }
}