import { AppDataSource } from "../database/AppDataSource"
import { Country } from "@domain/entities/Country"
import { City } from "@domain/entities/City"
import { Stadium } from "@domain/entities/Stadium"
import { Team } from "@domain/entities/Team"
import { Match } from "@domain/entities/Match"

import { countries } from "@infrastructure/mock/countries"
import { cities } from "@infrastructure/mock/cities"
import { stadiums } from "@infrastructure/mock/stadiums"
import { teams } from "@infrastructure/mock/teams"
import { matchs } from "@infrastructure/mock/matchs"

async function seed() {
  await AppDataSource.initialize()

  console.log("Seeding database...")

  const countryRepo = AppDataSource.getRepository(Country)
  const cityRepo = AppDataSource.getRepository(City)
  const stadiumRepo = AppDataSource.getRepository(Stadium)
  const teamRepo = AppDataSource.getRepository(Team)
  const matchRepo = AppDataSource.getRepository(Match)

  for (const c of countries) {
    const country = new Country(c.name, c.code)
    await countryRepo.save(country)
  }

  for (const c of cities) {
    const country = await countryRepo.findOneBy({ name: c.country.name })
    if (!country) continue

    const city = new City(c.name, country)
    await cityRepo.save(city)
  }

  for (const s of stadiums) {
    const city = await cityRepo.findOneBy({ name: s.city.name })
    if (!city) continue

    const stadium = new Stadium(s.name, city, s.capacity)
    await stadiumRepo.save(stadium)
  }

  for (const t of teams) {
    const team = new Team(t.name, t.fifaCode)
    await teamRepo.save(team)
  }

  for (const m of matchs) {
    const stadium = await stadiumRepo.findOneBy({ name: m.stadium.name })
    const homeTeam = await teamRepo.findOneBy({ fifaCode: m.homeTeam.fifaCode })
    const awayTeam = await teamRepo.findOneBy({ fifaCode: m.awayTeam.fifaCode })

    if (!stadium || !homeTeam || !awayTeam) continue

    const match = new Match(
      m.id,
      stadium,
      homeTeam,
      awayTeam,
      m.stage,
      m.status,
      m.date,
      m.homeScore,
      m.awayScore
    )

    await matchRepo.save(match)
  }

  console.log("Seeding done ✅")
  await AppDataSource.destroy()
  process.exit(0)
}

seed()