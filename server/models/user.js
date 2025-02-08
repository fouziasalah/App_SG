'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true, 
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user', 
    },
  }, {
    tableName: 'Users',
    timestamps: true,  
  });

  return User;
};
