import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { CityService } from "@application/services/CityService"
import { City } from "@domain/entities/City"
import { NotFoundError } from "@domain/errors/NotFoundError"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Repository } from "typeorm"

const cityRepository: Repository<City> = AppDataSource.getRepository(City)
const cityService: CityService = new CityService(cityRepository)

export class GetCityByNameHandler {
  async handle(c: Context) {
    try {
      const { name } = c.req.param()

      const data = await cityService.findByName(name)

      return c.json({
        success: true,
        message: `City "${data.name}" found`,
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