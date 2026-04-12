import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "@infrastructure/database/AppDataSource"
import { Ticket } from "@domain/entities/Ticket"
import { Match } from "@domain/entities/Match"
import { CreateTicketSchema } from "./CreateTicketSchema"

export class CreateTicketHandler {
  async handle(c: Context) {
    const body = await c.req.json()

    const result = CreateTicketSchema.safeParse(body)

    if (!result.success) {
      throw new HTTPException(400, { message: "Invalid request body" })
    }

    const { matchId, seat, customer } = result.data

    const matchRepository = AppDataSource.getRepository(Match)
    const ticketRepository = AppDataSource.getRepository(Ticket)

    const match = await matchRepository.findOneBy({ id: matchId })

    if (!match) {
      throw new HTTPException(404, { message: "Match not found" })
    }

    const existingTickets = await ticketRepository.find()

    const seatAlreadyTaken = existingTickets.find(
      (ticket) => ticket.match.id === matchId && ticket.seat === seat
    )

    if (seatAlreadyTaken) {
      throw new HTTPException(409, { message: "Seat already reserved" })
    }

    const newTicket = new Ticket(
      existingTickets.length + 1,
      match,
      seat,
      customer
    )

    await ticketRepository.save(newTicket)

    return c.json(
      {
        success: true,
        message: "Ticket created",
        data: newTicket
      },
      201
    )
  }
}