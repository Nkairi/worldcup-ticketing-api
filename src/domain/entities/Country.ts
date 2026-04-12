import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({ unique: true })
  code!: string

  constructor(name?: string, code?: string) {
    this.name = name ?? ""
    this.code = code ?? ""
  }
}