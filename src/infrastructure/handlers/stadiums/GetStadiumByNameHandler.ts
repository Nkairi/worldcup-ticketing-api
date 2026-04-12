import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Stadium } from "@domain/entities/Stadium"

export class GetStadiumByNameHandler {
  async handle(c: Context) {
    const name = c.req.param("name").toLowerCase()

    const stadiumRepository = AppDataSource.getRepository(Stadium)

    const stadiums = await stadiumRepository.find()
    const stadium = stadiums.find(
      (stadium) => stadium.name.toLowerCase() === name
    )

    if (!stadium) {
      throw new HTTPException(404, { message: "Stadium not found" })
    }

    return c.json({
      success: true,
      data: stadium
    })
  }
}