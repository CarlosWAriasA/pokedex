const { DataTypes } = require("sequelize");

const connection = require("../context/AppContext");

const Pokemones = connection.define("pokemones", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
})

module.exports = Pokemones;