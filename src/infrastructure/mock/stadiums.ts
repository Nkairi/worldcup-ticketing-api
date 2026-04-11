import { Stadium } from "@domain/entities/Stadium"
import { cities } from "./cities"

export const stadiums = [
  new Stadium("Mercedes-Benz Stadium", cities[0], 67382),
  new Stadium("Estadio Azteca", cities[1], 72766),
  new Stadium("BMO Field", cities[2], 45000)
]