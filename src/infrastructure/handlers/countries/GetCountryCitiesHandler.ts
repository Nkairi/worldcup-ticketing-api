import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { CountryService } from "@application/services/CountryService"
import { City } from "@domain/entities/City"
import { Country } from "@domain/entities/Country"
import { NotFoundError } from "@domain/errors/NotFoundError"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Repository } from "typeorm"

const countryRepository: Repository<Country> = AppDataSource.getRepository(Country)
const cityRepository: Repository<City> = AppDataSource.getRepository(City)
const countryService: CountryService = new CountryService(countryRepository)

export class GetCountryCitiesHandler {
  async handle(c: Context) {
    try {
      const { code } = c.req.param()

      const country = await countryService.findByCode(code)
      const cities = await cityRepository.find()

      const data = cities.filter(
        (city) => city.country.code.toLowerCase() === country.code.toLowerCase()
      )

      return c.json({
        success: true,
        data
      })
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message })
      }

      throw e
    }
  }
}