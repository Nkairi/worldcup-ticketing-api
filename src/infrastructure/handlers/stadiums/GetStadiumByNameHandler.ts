import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { stadiums } from "@infrastructure/mock/stadiums"

export class GetStadiumByNameHandler {
  async handle(c: Context) {
    const name = c.req.param("name").toLowerCase()

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