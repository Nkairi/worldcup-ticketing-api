import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { CountryService } from "@application/services/CountryService"
import { Country } from "@domain/entities/Country"
import { NotFoundError } from "@domain/errors/NotFoundError"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Repository } from "typeorm"

const countryRepository: Repository<Country> = AppDataSource.getRepository(Country)
const countryService: CountryService = new CountryService(countryRepository)

export class GetCountryByCodeHandler {
  async handle(c: Context) {
    try {
      const { code } = c.req.param()

      const data = await countryService.findByCode(code)

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