import { City } from "@domain/entities/City"
import { countries } from "./countries"

export const cities = [
  new City("Atlanta", countries[0]),
  new City("Mexico City", countries[1]),
  new City("Toronto", countries[2])
]