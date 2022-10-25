const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon',
  {
    id: {
      type: DataTypes.UUID,
      // type: DataTypes.INTEGER,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    life: {
      type: DataTypes.INTEGER
    },

    attack: {
      type: DataTypes.INTEGER
    },

    defense: {
      type: DataTypes.INTEGER
    },

    speed: {
      type: DataTypes.INTEGER
    },

    height: {
      type: DataTypes.INTEGER
    },

    weight: {
      type: DataTypes.INTEGER
    },

    img: {
      type: DataTypes.TEXT,
      defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png',
      validate: {
        isUrl: true,
      }
    },

    createdDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};
