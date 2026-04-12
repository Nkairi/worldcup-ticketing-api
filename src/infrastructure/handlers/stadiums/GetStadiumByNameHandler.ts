import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { StadiumService } from "@application/services/StadiumService"
import { Stadium } from "@domain/entities/Stadium"
import { NotFoundError } from "@domain/errors/NotFoundError"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Repository } from "typeorm"

const stadiumRepository: Repository<Stadium> = AppDataSource.getRepository(Stadium)
const stadiumService: StadiumService = new StadiumService(stadiumRepository)

export class GetStadiumByNameHandler {
  async handle(c: Context) {
    try {
      const { name } = c.req.param()

      const data = await stadiumService.findByName(name)

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