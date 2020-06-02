module.exports = (sequelize, DataTypes) => {
    const Drink = sequelize.define('drinks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
      name: DataTypes.STRING,
      preco: DataTypes.FLOAT,
      quantidade: DataTypes.INTEGER
    });
  
    return Drink;
  }