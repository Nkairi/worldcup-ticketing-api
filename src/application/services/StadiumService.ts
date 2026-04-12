import { Stadium } from "@domain/entities/Stadium"
import { NotFoundError } from "@domain/errors/NotFoundError"
import { Repository } from "typeorm"

type StadiumFilters = {
  name?: string
}

export class StadiumService {
  private readonly stadiumRepository: Repository<Stadium>

  constructor(stadiumRepository: Repository<Stadium>) {
    this.stadiumRepository = stadiumRepository
  }

  async findAll({ name }: StadiumFilters = {}): Promise<Stadium[]> {
    const stadiums = await this.stadiumRepository.find()

    return stadiums.filter((stadium) => {
      return name
        ? stadium.name.toLowerCase().includes(name.toLowerCase())
        : true
    })
  }

  async findByName(name: string): Promise<Stadium> {
    const stadiums = await this.stadiumRepository.find()

    const stadium = stadiums.find(
      (stadium) => stadium.name.toLowerCase() === name.toLowerCase()
    )

    if (!stadium) {
      throw new NotFoundError(`Stadium "${name}" does not exist`)
    }

    return stadium
  }
}