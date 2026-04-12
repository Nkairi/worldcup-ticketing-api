import { Match } from "@domain/entities/Match"
import { NotFoundError } from "@domain/errors/NotFoundError"
import { ValidationError } from "@domain/errors/ValidationError"
import { Repository } from "typeorm"

type MatchFilters = {
  teamCode?: string
  stage?: string
  date?: string
}

export class MatchService {
  private readonly matchRepository: Repository<Match>

  constructor(matchRepository: Repository<Match>) {
    this.matchRepository = matchRepository
  }

  async findAll({ teamCode, stage, date }: MatchFilters = {}): Promise<Match[]> {
    let matchs = await this.matchRepository.find()

    if (teamCode) {
      const normalizedCode = teamCode.toUpperCase()

      if (!/^[A-Z]{3}$/.test(normalizedCode)) {
        throw new ValidationError("Invalid FIFA code")
      }

      matchs = matchs.filter(
        (match) =>
          match.homeTeam.fifaCode === normalizedCode ||
          match.awayTeam.fifaCode === normalizedCode
      )
    }

    if (stage) {
      const allowedStages = [
        "group",
        "round_of_32",
        "round_of_16",
        "quarter_finals",
        "semi_finals",
        "third_place",
        "final"
      ]

      if (!allowedStages.includes(stage)) {
        throw new ValidationError("Invalid stage")
      }

      matchs = matchs.filter((match) => match.stage === stage)
    }

    if (date) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        throw new ValidationError("Invalid date format")
      }

      matchs = matchs.filter(
        (match) => match.date.toISOString().split("T")[0] === date
      )
    }

    return matchs
  }

  async findById(id: number): Promise<Match> {
    const match = await this.matchRepository.findOneBy({ id })

    if (!match) {
      throw new NotFoundError(`Match "${id}" does not exist`)
    }

    return match
  }

  async findByStage(stage: string): Promise<Match[]> {
    const allowedStages = [
      "group",
      "round_of_32",
      "round_of_16",
      "quarter_finals",
      "semi_finals",
      "third_place",
      "final"
    ]

    if (!allowedStages.includes(stage)) {
      throw new ValidationError("Invalid stage")
    }

    const matchs = await this.matchRepository.find()
    return matchs.filter((match) => match.stage === stage)
  }

  async findByStatus(status: string): Promise<Match[]> {
    const allowedStatus = ["scheduled", "live", "finished", "cancelled"]

    if (!allowedStatus.includes(status)) {
      throw new ValidationError("Invalid status")
    }

    const matchs = await this.matchRepository.find()
    return matchs.filter((match) => match.status === status)
  }
}