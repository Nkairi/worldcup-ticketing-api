import { City } from "@domain/entities/City"
import { NotFoundError } from "@domain/errors/NotFoundError"
import { ILike, type Repository } from "typeorm"

type CityFilters = {
  name?: string
  country?: string
}

export class CityService {
  private readonly cityRepository: Repository<City>

  constructor(cityRepository: Repository<City>) {
    this.cityRepository = cityRepository
  }

  async findAll({ name, country }: CityFilters = {}): Promise<City[]> {
    const cities = await this.cityRepository.find()

    return cities.filter((city) => {
      const matchesName = name
        ? city.name.toLowerCase().includes(name.toLowerCase())
        : true

      const matchesCountry = country
        ? city.country.code.toLowerCase() === country.toLowerCase()
        : true

      return matchesName && matchesCountry
    })
  }

  async findByName(name: string): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: { name: ILike(name) }
    })

    if (!city) {
      throw new NotFoundError(`City "${name}" does not exist`)
    }

    return city
  }

  async findByCountryCode(countryCode: string): Promise<City[]> {
    const cities = await this.cityRepository.find()

    return cities.filter(
      (city) => city.country.code.toLowerCase() === countryCode.toLowerCase()
    )
  }
}