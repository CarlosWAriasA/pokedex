const { DataTypes } = require("sequelize");

const connection = require("../context/AppContext");

const Tipos = connection.define("tipos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
})

module.exports = Tipos;