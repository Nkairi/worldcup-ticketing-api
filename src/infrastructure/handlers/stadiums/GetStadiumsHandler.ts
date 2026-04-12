import { Context } from "hono"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Stadium } from "@domain/entities/Stadium"

export class GetStadiumsHandler {
  async handle(c: Context) {
    const name = c.req.query("name")

    const stadiumRepository = AppDataSource.getRepository(Stadium)

    let stadiums = await stadiumRepository.find()

    if (name) {
      stadiums = stadiums.filter((stadium) =>
        stadium.name.toLowerCase().includes(name.toLowerCase())
      )
    }

    return c.json({
      success: true,
      data: stadiums
    })
  }
}