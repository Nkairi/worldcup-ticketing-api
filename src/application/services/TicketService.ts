import { Match } from "@domain/entities/Match"
import { Ticket } from "@domain/entities/Ticket"
import { ConflictError } from "@domain/errors/ConflictError"
import { NotFoundError } from "@domain/errors/NotFoundError"
import { ValidationError } from "@domain/errors/ValidationError"
import { Repository } from "typeorm"

type CreateTicketInput = {
  matchId: number
  seat: string
  customer: {
    firstname: string
    lastname: string
    email: string
  }
}

export class TicketService {
  private readonly ticketRepository: Repository<Ticket>
  private readonly matchRepository: Repository<Match>

  constructor(
    ticketRepository: Repository<Ticket>,
    matchRepository: Repository<Match>
  ) {
    this.ticketRepository = ticketRepository
    this.matchRepository = matchRepository
  }

  async create(input: CreateTicketInput): Promise<Ticket> {
    const { matchId, seat, customer } = input

    if (!Number.isInteger(matchId) || matchId <= 0) {
      throw new ValidationError("Invalid matchId")
    }

    if (!seat || seat.length < 1 || seat.length > 10) {
      throw new ValidationError("Invalid seat")
    }

    if (!customer.firstname || !customer.lastname || !customer.email) {
      throw new ValidationError("Invalid customer")
    }

    const match = await this.matchRepository.findOneBy({ id: matchId })

    if (!match) {
      throw new NotFoundError("Match not found")
    }

    const existingTickets = await this.ticketRepository.find()

    const seatAlreadyTaken = existingTickets.find(
      (ticket) =>
        ticket.match.id === matchId &&
        ticket.seat.toLowerCase() === seat.toLowerCase()
    )

    if (seatAlreadyTaken) {
      throw new ConflictError("Seat already reserved")
    }

    const newTicket = new Ticket(
      existingTickets.length + 1,
      match,
      seat,
      customer
    )

    return await this.ticketRepository.save(newTicket)
  }
}