import { Country } from "@domain/entities/Country"
import { NotFoundError } from "@domain/errors/NotFoundError"
import { Repository } from "typeorm"

type CountryFilters = {
  name?: string
}

export class CountryService {
  private readonly countryRepository: Repository<Country>

  constructor(countryRepository: Repository<Country>) {
    this.countryRepository = countryRepository
  }

  async findAll({ name }: CountryFilters = {}): Promise<Country[]> {
    const countries = await this.countryRepository.find()

    return countries.filter((country) => {
      return name
        ? country.name.toLowerCase().includes(name.toLowerCase())
        : true
    })
  }

  async findByCode(code: string): Promise<Country> {
    const normalizedCode = code.toLowerCase()

    const country = await this.countryRepository.findOneBy({
      code: normalizedCode
    })

    if (!country) {
      throw new NotFoundError(`Country "${code}" does not exist`)
    }

    return country
  }
}