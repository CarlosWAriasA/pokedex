const { DataTypes } = require("sequelize");

const connection = require("../context/AppContext");

const Regiones = connection.define("regiones", {
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

module.exports = Regiones;