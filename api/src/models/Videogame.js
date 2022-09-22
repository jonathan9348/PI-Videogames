const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },

    released: {
      type: DataTypes.STRING,
    },

    rating: {
      type: DataTypes.INTEGER,

    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,

    },

    image: {
      type: DataTypes.STRING,
    },

    createdInDb :{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }

  }, {timestamps: false,});
};
 