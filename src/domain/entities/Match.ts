import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm"
import { Stadium } from "./Stadium"
import { Team } from "./Team"
import { MatchStage } from "@domain/enums/MatchStage"
import { MatchStatus } from "@domain/enums/MatchStatus"

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  dbId!: number

  @Column()
  id!: number

  @ManyToOne(() => Stadium, { eager: true })
  stadium!: Stadium

  @ManyToOne(() => Team, { eager: true })
  homeTeam!: Team

  @ManyToOne(() => Team, { eager: true })
  awayTeam!: Team

  @Column({ type: "varchar" })
  stage!: MatchStage

  @Column({ type: "varchar" })
  status!: MatchStatus

  @Column({ type: "datetime" })
  date!: Date

  @Column({ default: 0 })
  homeScore!: number

  @Column({ default: 0 })
  awayScore!: number

  constructor(
    id?: number,
    stadium?: Stadium,
    homeTeam?: Team,
    awayTeam?: Team,
    stage?: MatchStage,
    status?: MatchStatus,
    date?: Date,
    homeScore: number = 0,
    awayScore: number = 0
  ) {
    this.id = id ?? 0
    this.stadium = stadium!
    this.homeTeam = homeTeam!
    this.awayTeam = awayTeam!
    this.stage = stage!
    this.status = status!
    this.date = date ?? new Date()
    this.homeScore = homeScore
    this.awayScore = awayScore

    if (id !== undefined) {
      if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Match id must be a positive integer")
      }

      if (homeTeam && awayTeam && homeTeam.fifaCode === awayTeam.fifaCode) {
        throw new Error("Teams must be different")
      }

      if (homeScore < 0 || awayScore < 0) {
        throw new Error("Scores must be >= 0")
      }
    }
  }
}