'use strict';



module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async transaction => {

      await queryInterface.changeColumn('Todos', 'start_timestamp', {
        type: Sequelize.BIGINT
      }, { transaction })

      await queryInterface.changeColumn('Todos', 'finish_timestamp', {
        type: Sequelize.BIGINT
      }, { transaction })
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async transaction => {

      await queryInterface.changeColumn('Todos', 'start_timestamp', {
        type: Sequelize.INTEGER
      }, { transaction })

      await queryInterface.changeColumn('Todos', 'finish_timestamp', {
        type: Sequelize.INTEGER
      }, { transaction })
    })
  }
};
