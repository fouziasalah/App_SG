'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('societes_de_gestion', {
      idsocietgest: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nomsocietgest: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date_creation: {
        type: Sequelize.DATE,
        allowNull: false
      },
      nombre_de_fonds: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      encours_global_scpi: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      effectif: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('societes_de_gestion');
  }
};
