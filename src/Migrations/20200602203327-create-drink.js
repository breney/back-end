
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('drinks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      preco: {
        allowNull: false,
        type: Sequelize.FLOAT,
        unique: true,
      },
      quantidade: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt:{
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt:{
        allowNull: false,
        type: Sequelize.DATE,
      } 
      

    });
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('drinks');
  }
};
