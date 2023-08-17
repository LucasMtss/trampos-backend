import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

class Login extends Model {
  public id!: number;
  public username!: object;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Login.init(
  {
    username: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Login',
  }
);

export { Login };
