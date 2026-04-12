import { Team } from "@domain/entities/Team"
import { NotFoundError } from "@domain/errors/NotFoundError"
import { ValidationError } from "@domain/errors/ValidationError"
import { Repository } from "typeorm"

type TeamFilters = {
  name?: string
  sort?: string
}

export class TeamService {
  private readonly teamRepository: Repository<Team>

  constructor(teamRepository: Repository<Team>) {
    this.teamRepository = teamRepository
  }

  async findAll({ name, sort }: TeamFilters = {}): Promise<Team[]> {
    let teams = await this.teamRepository.find()

    if (name) {
      teams = teams.filter((team) =>
        team.name.toLowerCase().includes(name.toLowerCase())
      )
    }

    if (!sort || sort === "name") {
      teams.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === "-name") {
      teams.sort((a, b) => b.name.localeCompare(a.name))
    } else {
      throw new ValidationError("Invalid sort value")
    }

    return teams
  }

  async findByFifaCode(fifaCode: string): Promise<Team> {
    const normalizedCode = fifaCode.toUpperCase()

    if (!/^[A-Z]{3}$/.test(normalizedCode)) {
      throw new ValidationError("Invalid FIFA code")
    }

    const team = await this.teamRepository.findOneBy({
      fifaCode: normalizedCode
    })

    if (!team) {
      throw new NotFoundError(`Team "${fifaCode}" does not exist`)
    }

    return team
  }
}