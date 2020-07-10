import {
  Column,
  DataType,
  Model,
  Table,
  UpdatedAt,
  DeletedAt,
  CreatedAt,
  HasMany
} from "sequelize-typescript";
import Cities from "./Cities";
@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] }
  },
  paranoid: true,
  tableName: "countries"
})
export class Countries extends Model<Countries> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED
  })
  id!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  name!: string;


  @Column
  flag!: string;

 
  @HasMany(()=>Cities)
  cities!: Cities[];

  @Column
  iso!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  @Column
  deletedAt!: Date;
}

export default Countries;