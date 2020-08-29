'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodoStatus extends Model {
    static associate(models) {
      TodoStatus.hasMany(models.Todo, { foreignKey: 'status_id' })
    }
  };
  TodoStatus.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }, 
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    alias: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TodoStatus',
    timestamps: false
  });
  return TodoStatus;
};