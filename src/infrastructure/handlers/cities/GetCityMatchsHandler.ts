import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { CityService } from "@application/services/CityService"
import { City } from "@domain/entities/City"
import { Match } from "@domain/entities/Match"
import { NotFoundError } from "@domain/errors/NotFoundError"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Repository } from "typeorm"

const cityRepository: Repository<City> = AppDataSource.getRepository(City)
const matchRepository: Repository<Match> = AppDataSource.getRepository(Match)
const cityService: CityService = new CityService(cityRepository)

export class GetCityMatchsHandler {
  async handle(c: Context) {
    try {
      const { name } = c.req.param()

      await cityService.findByName(name)

      const matchs = await matchRepository.find()

      const data = matchs.filter(
        (match) => match.stadium.city.name.toLowerCase() === name.toLowerCase()
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