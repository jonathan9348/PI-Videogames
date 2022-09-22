const {DataTypes, Sequelize}  = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('genre', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          unique: true,
        },
    
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      }, {timestamps: false});
}