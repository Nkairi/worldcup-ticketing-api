import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { Ticket } from "@domain/entities/Ticket"
import { matchs } from "@infrastructure/mock/matchs"
import { tickets } from "@infrastructure/mock/tickets"
import { CreateTicketSchema } from "./CreateTicketSchema"

export class CreateTicketHandler {
  async handle(c: Context) {
    const body = await c.req.json()

    const result = CreateTicketSchema.safeParse(body)

    if (!result.success) {
      throw new HTTPException(400, { message: "Invalid request body" })
    }

    const { matchId, seat, customer } = result.data

    const match = matchs.find((m) => m.id === matchId)

    if (!match) {
      throw new HTTPException(404, { message: "Match not found" })
    }

    const seatAlreadyTaken = tickets.find(
      (ticket) => ticket.match.id === matchId && ticket.seat === seat
    )

    if (seatAlreadyTaken) {
      throw new HTTPException(409, { message: "Seat already reserved" })
    }

    const newTicket = new Ticket(
      tickets.length + 1,
      match,
      seat,
      customer
    )

    tickets.push(newTicket)

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