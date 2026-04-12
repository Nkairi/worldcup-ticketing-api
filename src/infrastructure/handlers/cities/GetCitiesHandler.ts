import { Context } from "hono"
import { CityService } from "@application/services/CityService"
import { City } from "@domain/entities/City"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Repository } from "typeorm"

const cityRepository: Repository<City> = AppDataSource.getRepository(City)
const cityService: CityService = new CityService(cityRepository)

export class GetCitiesHandler {
  async handle(c: Context) {
    const name = c.req.query("name")
    const country = c.req.query("country")

    const data = await cityService.findAll({ name, country })

    return c.json({
      success: true,
      data
    })
  }
}