import { Context } from "hono"
import { CountryService } from "@application/services/CountryService"
import { Country } from "@domain/entities/Country"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Repository } from "typeorm"

const countryRepository: Repository<Country> = AppDataSource.getRepository(Country)
const countryService: CountryService = new CountryService(countryRepository)

export class GetCountriesHandler {
  async handle(c: Context) {
    const name = c.req.query("name")

    const data = await countryService.findAll({ name })

    return c.json({
      success: true,
      data
    })
  }
}