import { Optional } from 'sequelize';
import { Column, Model, Table, DataType, AllowNull } from 'sequelize-typescript';

import { CountryDto } from '@interfaces/countries.interface';

export type CountryAttributes = Optional<CountryDto, 'id'>;

@Table({ timestamps: true, createdAt: 'createdAt', updatedAt: 'updatedAt', tableName: 'countries' })
export default class Country extends Model<CountryDto, CountryAttributes> implements CountryDto {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public id: number;

  @Column(DataType.STRING(3))
  public isoCode: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public name: string;

  @AllowNull(false)
  @Column
  public readonly createdAt!: Date;

  @Column
  public readonly updatedAt!: Date;
}
