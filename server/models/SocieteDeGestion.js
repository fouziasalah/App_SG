
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  
const Scpi = require('./Scpi');

const SocieteDeGestion = sequelize.define('SocieteDeGestion', {
  idsocietgest: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomsocietgest: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_creation: {
    type: DataTypes.DATE,
    allowNull: false
  },
  nombre_de_fonds: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  encours_global_scpi: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  effectif: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  localisation: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT, 
    allowNull: true
  }
}, {
  tableName: 'societes_de_gestion',
  timestamps: false
});


SocieteDeGestion.associate = function(models) {
  SocieteDeGestion.hasMany(models.Scpi, { foreignKey: 'idSocieteGest' , as: 'scpis'});

 
};

module.exports = SocieteDeGestion;
