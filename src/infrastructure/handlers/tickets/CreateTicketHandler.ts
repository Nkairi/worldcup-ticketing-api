import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { TicketService } from "@application/services/TicketService"
import { Match } from "@domain/entities/Match"
import { Ticket } from "@domain/entities/Ticket"
import { ConflictError } from "@domain/errors/ConflictError"
import { NotFoundError } from "@domain/errors/NotFoundError"
import { ValidationError } from "@domain/errors/ValidationError"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { CreateTicketSchema } from "./CreateTicketSchema"
import { Repository } from "typeorm"

const ticketRepository: Repository<Ticket> = AppDataSource.getRepository(Ticket)
const matchRepository: Repository<Match> = AppDataSource.getRepository(Match)
const ticketService: TicketService = new TicketService(ticketRepository, matchRepository)

export class CreateTicketHandler {
  async handle(c: Context) {
    try {
      const body = await c.req.json()

      const result = CreateTicketSchema.safeParse(body)

      if (!result.success) {
        throw new HTTPException(400, { message: "Invalid request body" })
      }

      const data = await ticketService.create(result.data)

      return c.json(
        {
          success: true,
          message: "Ticket created",
          data
        },
        201
      )
    } catch (e) {
      if (e instanceof ValidationError) {
        throw new HTTPException(400, { message: e.message })
      }

      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message })
      }

      if (e instanceof ConflictError) {
        throw new HTTPException(409, { message: e.message })
      }

      throw e
    }
  }
}