'use strict';
// migrations/20230203120100-create-scpi.js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('scpi', {
      idscpi: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nomscpi: {
        type: Sequelize.STRING,
        allowNull: false
      },
    typescpi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      categoriecpi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      capitalisation: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      date_creation: {
        type: Sequelize.DATE,
        allowNull: false
      },
  
      idSocieteGest: { 
        type: Sequelize.INTEGER,
        references: {
          model: 'societes_de_gestion', 
          key: 'idsocietgest'  
        },
        allowNull: false, 
        onDelete: 'CASCADE'  
      }
    
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('scpi');

  }
};
