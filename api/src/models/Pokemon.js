const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },

    idPoke: {
      type: DataTypes.INTEGER,
      unique: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    hp: {
      type: DataTypes.INTEGER,
      defaultValue: 35
    },

    attack: {
      type: DataTypes.INTEGER,
      defaultValue: 55
    },

    defense: {
      type: DataTypes.INTEGER,
      defaultValue: 40
    },

    speed: {
      type: DataTypes.INTEGER,
      defaultValue: 90
    },

    height: {
      type: DataTypes.INTEGER,
      defaultValue: 4
    },

    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 60
    },

    img: {
      type: DataTypes.TEXT,
      defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Pok%C3%A9ball.png/640px-Pok%C3%A9ball.png',
      validate: {
        isUrl: true,
      }
    },

    type: {
      type: DataTypes.TEXT,
      defaultValue: 'normal'
    },

    createdDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  },
  {
    timestamps: false
  }
  );
};
