// config/database.js
const { Sequelize } = require('sequelize');
const config = require('./config.json');

// Créer l'instance Sequelize avec les informations de connexion
const sequelize = new Sequelize(
  `postgres://${config.development.username}:${config.development.password}@${config.development.host}:${5432}/${config.development.database}`,
  {
    dialect: 'postgres',
    logging: false, // Désactive les logs si tu veux
  }
);

module.exports = sequelize;
