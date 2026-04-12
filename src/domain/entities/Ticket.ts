import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm"
import { Match } from "./Match"

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  dbId!: number

  @Column()
  id!: number

  @ManyToOne(() => Match, { eager: true })
  match!: Match

  @Column()
  seat!: string

  @Column()
  customerFirstname!: string

  @Column()
  customerLastname!: string

  @Column()
  customerEmail!: string

  constructor(
    id?: number,
    match?: Match,
    seat?: string,
    customer?: {
      firstname: string
      lastname: string
      email: string
    }
  ) {
    this.id = id ?? 0
    this.match = match!
    this.seat = seat ?? ""
    this.customerFirstname = customer?.firstname ?? ""
    this.customerLastname = customer?.lastname ?? ""
    this.customerEmail = customer?.email ?? ""

    if (id !== undefined) {
      if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Ticket id must be a positive integer")
      }

      if (!seat || seat.length < 1 || seat.length > 10) {
        throw new Error("Seat must contain between 1 and 10 characters")
      }
    }
  }
}