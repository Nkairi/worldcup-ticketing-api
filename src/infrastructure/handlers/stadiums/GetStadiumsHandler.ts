import { Context } from "hono"
import { StadiumService } from "@application/services/StadiumService"
import { Stadium } from "@domain/entities/Stadium"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Repository } from "typeorm"

const stadiumRepository: Repository<Stadium> = AppDataSource.getRepository(Stadium)
const stadiumService: StadiumService = new StadiumService(stadiumRepository)

export class GetStadiumsHandler {
  async handle(c: Context) {
    const name = c.req.query("name")

    const data = await stadiumService.findAll({ name })

    return c.json({
      success: true,
      data
    })
  }
}