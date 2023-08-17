import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

class Curriculum extends Model {
  public id!: number;
  public data!: object;
  public slug!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Curriculum.init(
  {
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Curriculum',
  }
);

export { Curriculum };
