import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'lucas',
  password: '1234#Lrm',
  database: 'trampos_db',
});

export { sequelize };