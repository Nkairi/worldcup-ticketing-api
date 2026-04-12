import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: "localhost",
  port: 3306,
  username: "worldcup_ticketing",
  password: "pass123",
  database: "worldcup_ticketing",
  synchronize: true,
  logging: false,
  entities: [],
})