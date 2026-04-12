import "reflect-metadata"
import { DataSource } from "typeorm"
import { Country } from "@domain/entities/Country"
import { City } from "@domain/entities/City"
import { Stadium } from "@domain/entities/Stadium"
import { Team } from "@domain/entities/Team"
import { Match } from "@domain/entities/Match"
import { Ticket } from "@domain/entities/Ticket"

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Country, City, Stadium, Team, Match, Ticket]
})