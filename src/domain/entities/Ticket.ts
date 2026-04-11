import { Match } from "@domain/entities/Match"

export class Ticket {
  constructor(
    public id: number,
    public match: Match,
    public seat: string,
    public customer: {
      firstname: string
      lastname: string
      email: string
    }
  ) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Ticket id must be a positive integer")
    }

    if (!seat || seat.length < 1 || seat.length > 10) {
      throw new Error("Seat must contain between 1 and 10 characters")
    }
  }
}