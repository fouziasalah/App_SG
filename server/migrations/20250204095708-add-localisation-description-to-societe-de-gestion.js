'use strict';

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('societes_de_gestion', 'localisation', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('societes_de_gestion', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('societes_de_gestion', 'localisation');
    await queryInterface.removeColumn('societes_de_gestion', 'description');
  }};
