
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  
const SocieteDeGestion = require('./SocieteDeGestion');

const Scpi = sequelize.define('Scpi', {
  idscpi: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomscpi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  typescpi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoriecpi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capitalisation: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  date_creation: {
    type: DataTypes.DATE,
    allowNull: false
  },
  idSocieteGest: {
    type: DataTypes.INTEGER,
    references: {
      model: 'SocieteDeGestion',
      key: 'idsocietgest' 
    },
    allowNull: false,
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'scpi',
  timestamps: false
});

// Scpi.associate = function(models) {
//   Scpi.belongsTo(models.SocieteDeGestion, { foreignKey: 'idSocieteGest', as: 'societe' });
// };
Scpi.associate = function (models) {
  Scpi.belongsTo(models.SocieteDeGestion, {
      foreignKey: "idSocieteGest",
      as: "societe"
  });
};

module.exports = Scpi;
