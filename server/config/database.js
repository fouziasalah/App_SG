
const { Sequelize } = require('sequelize');
const config = require('./config.json');

// Créer l'instance Sequelize 
const sequelize = new Sequelize(
  `postgres://${config.development.username}:${config.development.password}@${config.development.host}:${5432}/${config.development.database}`,
  {
    dialect: 'postgres',
    logging: false, 
  }
);

module.exports = sequelize;
