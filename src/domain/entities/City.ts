import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Country } from "./Country"

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name: string

  @ManyToOne(() => Country, { eager: true })
  country: Country

  constructor(name: string, country: Country) {
    this.name = name
    this.country = country
  }
}