import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

class User extends Model {
  public id!: number;
  public nome!: string;
  public idade!: number;
  public profissao!: string;
  public urlImagem!: string;
  public urlCurriculo!: string;
  public habilidades!: string;
  public nivelSenioridade!: string;
  public cep!: string;
  public estado!: string;
  public cidade!: string;
  public rua!: string;
  public bairro!: string;
  public numero!: string;
  public complemento!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    profissao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlImagem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlCurriculo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    habilidades: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nivelSenioridade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rua: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complemento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export { User };
