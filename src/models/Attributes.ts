import {
  Column,
  DataType,
  Model,
  Table,
  UpdatedAt,
  DeletedAt,
  CreatedAt,
  Scopes,
  Default,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
} from "sequelize-typescript";
import { literal } from "sequelize";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: true,
  tableName: "attributes",
})
@Scopes({
  basic: {
    attributes: ["id", "name", "slug", "type"],
  },
  website: {
    attributes: ["id", "name", "type"],
    where: { active: true },
  },
})
export class Attributes extends Model<Attributes> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @Column({ unique: true })
  slug!: string;

  @Column
  name!: string;

  @Column
  unit!: string;

  @Column({
    type: DataType.ENUM,
    values: ["text", "image"],
  })
  type!: string;

  @Default(true)
  @Column
  active!: boolean;

  @Column
  createdBy!: number;
  @Column
  updatedBy!: number;
  @Column
  deletedBy!: number;

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

export default Attributes;
